import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Descriptions } from 'antd';
import { CodeListEntity, ParaclinicEntity, TFormConfig } from 'api/fhir/models';
import { HpoApi } from 'api/hpo';
import { IHpoNode } from 'api/hpo/models';
import {
  useCodeSystem,
  useObservationComplexParacliniqueEntity,
  useObservationParacliniqueEntity,
  useParaclinicValueSetEntity,
  useValueSet,
} from 'graphql/prescriptions/actions';
import { concat, find, map, some } from 'lodash';
import { valueSetID } from 'views/Prescriptions/Entity/constants';

import { useLang } from 'store/global';

type OwnProps = {
  ids: string[] | null;
  complexIds: string[] | null;
  prescriptionFormConfig?: TFormConfig;
};

export const moveOtherParaclinique = (paracliniqueList: ParaclinicEntity[]) => {
  const newList = [...paracliniqueList];
  const otherParaclinique = find(paracliniqueList, (p) => p?.category === 'exam');
  otherParaclinique ? newList.push(newList.splice(newList.indexOf(otherParaclinique), 1)[0]) : null;
  return newList;
};

const displayComplexParaclinique = (
  value: ParaclinicEntity,
  codeInfo: CodeListEntity,
  lang: string,
  paraclinicValueSet: CodeListEntity[],
) => {
  const codeSystemInfo = find(codeInfo?.concept, (c) => c.code === value?.code);
  const label = find(codeSystemInfo?.designation, (o) => o.language === lang);
  const valueList: string[] = [];
  if (paraclinicValueSet) {
    value.valueCodeableConcept?.coding.forEach((v) => {
      const paraclinicValue = paraclinicValueSet.find((p: CodeListEntity) =>
        p.id?.includes(value.code.toLowerCase()),
      );
      const hpoValueset = find(paraclinicValue?.concept, (p) => p.code === v.code);
      const traduction = find(hpoValueset?.designation, (o) => o.language === lang);
      hpoValueset ? valueList.push(traduction ? traduction.value : hpoValueset.display) : null;
    });
  }
  return (
    <Descriptions.Item
      key={value?.id.split('/')[1]}
      label={label ? label.value : codeSystemInfo?.display}
    >
      {`${
        value?.interpretation
          ? intl.get(`screen.prescription.entity.paraclinique.${value.interpretation.coding?.code}`)
          : ''
      }  ${valueList.length > 0 ? `: ${valueList.join(', ')}` : ''}`}
    </Descriptions.Item>
  );
};

const displayCgh = (
  value: ParaclinicEntity,
  codeInfo: CodeListEntity,
  cghValueSet: CodeListEntity,
  lang: string,
) => {
  const codeSystemInfo = find(codeInfo?.concept, (c) => c.code === value?.code);
  const label =
    value?.category === 'exam'
      ? intl.get('prescription.clinical_exam.other_examination')
      : find(codeSystemInfo?.designation, (o) => o.language === lang)?.value ||
        codeSystemInfo?.display;

  let displayValue = null;

  if (value?.interpretation?.coding?.code === 'A') {
    displayValue = `${intl.get(
      `screen.prescription.entity.paraclinique.A`,
    )} : ${value?.valueCodeableConcept?.coding
      .map((v) => {
        const foundConcept = cghValueSet?.concept.find((concept) => concept.code === v.code);
        return (
          foundConcept?.designation.find((d) => d.language === lang)?.value || foundConcept?.display
        );
      })
      .join(', ')}`;
  } else if (value?.interpretation?.coding?.code === 'N') {
    displayValue = intl.get(`screen.prescription.entity.paraclinique.N`);
  } else {
    displayValue = value?.valueString ? value?.valueString : '';
  }

  return (
    <Descriptions.Item
      key={value?.id?.split('/')[1]}
      label={label ? label : codeSystemInfo?.display}
    >
      {displayValue}
    </Descriptions.Item>
  );
};

const displayParaclinique = (
  value: ParaclinicEntity,
  codeInfo: CodeListEntity,
  lang: string,
  unit: string,
) => {
  const codeSystemInfo = find(codeInfo?.concept, (c) => c.code === value?.code);
  const label =
    value?.category === 'exam'
      ? `${intl.get('screen.prescription.entity.paraclinique.other')}`
      : find(codeSystemInfo?.designation, (o) => o.language === lang)?.value;

  let displayValue = null;

  if (value?.interpretation?.coding?.code === 'A') {
    if (value?.valueString) {
      displayValue = `${intl.get(`screen.prescription.entity.paraclinique.A`)} : ${
        value?.valueString
      }  ${unit}`;
    } else {
      displayValue = intl.get(`screen.prescription.entity.paraclinique.A`);
    }
  } else if (value?.interpretation?.coding?.code === 'N') {
    displayValue = intl.get(`screen.prescription.entity.paraclinique.N`);
  } else {
    displayValue = value?.valueString ? value?.valueString : '';
  }
  return (
    <Descriptions.Item
      key={value?.id?.split('/')[1]}
      label={label ? label : codeSystemInfo?.display}
    >
      {displayValue}
    </Descriptions.Item>
  );
};

const hasHPO = (element: ParaclinicEntity) =>
  ['BMUS', 'EMG'].includes(element?.code) && element?.interpretation?.coding?.code === 'A';

export const Paraclinique = ({ ids, complexIds, prescriptionFormConfig }: OwnProps) => {
  const { paracliniqueValue } = useObservationParacliniqueEntity(ids);
  const { complexParacliniqueValue } = useObservationComplexParacliniqueEntity(complexIds);
  const { codeInfo } = useCodeSystem('observation-code');
  const [allParacliniqueValue, setAllParacliniqueValue] = useState<any>();
  const [currentHPOOptions, setCurrentHPOOptions] = useState<IHpoNode>();
  const [hpoList, setHpoList] = useState<IHpoNode[]>([]);
  const cghAnomaliesValueSet = useValueSet('cgh-abnormalities');
  const { paraclinicValueSet: paraclinicValueSet } = useParaclinicValueSetEntity([
    valueSetID.bmusAbnormalities,
    valueSetID.emgAbnormalities,
  ]);
  const lang = useLang();
  const handleHpoSearchTermChanged = (term: string) => {
    HpoApi.searchHpos(term.toLowerCase().trim()).then(({ data, error }) => {
      if (!error) {
        const results = map(data?.hits, '_source');
        setCurrentHPOOptions(results[0]);
      }
    });
  };

  useEffect(() => {
    if (paracliniqueValue || complexParacliniqueValue) {
      setAllParacliniqueValue(
        moveOtherParaclinique(concat(paracliniqueValue, complexParacliniqueValue)),
      );
    }
  }, [paracliniqueValue, complexParacliniqueValue]);

  useEffect(() => {
    if (allParacliniqueValue) {
      allParacliniqueValue.forEach((element: any) => {
        if (hasHPO(element)) {
          element.valueCodeableConcept?.coding.forEach((c: any) => {
            handleHpoSearchTermChanged(c.code);
          });
        }
      });
    }
  }, [allParacliniqueValue]);

  useEffect(() => {
    if (currentHPOOptions) {
      const isExisting = some(hpoList, currentHPOOptions);
      if (!isExisting) {
        const tempo = [...hpoList, currentHPOOptions];
        setHpoList(tempo);
      }
    }
  }, [currentHPOOptions, hpoList]);
  return (
    <Descriptions column={1} size="small" className="label-20">
      {allParacliniqueValue?.map((element: ParaclinicEntity) => {
        if (hasHPO(element)) {
          return displayComplexParaclinique(element, codeInfo, lang, paraclinicValueSet);
        } else if (element?.code === 'CGH') {
          return displayCgh(element, codeInfo, cghAnomaliesValueSet.valueSet, lang);
        }

        const associatedConfig = prescriptionFormConfig?.paraclinical_exams.default_list.find(
          (d) => d.value === element?.code,
        );

        return displayParaclinique(element, codeInfo, lang, associatedConfig?.extra?.unit || '');
      })}
    </Descriptions>
  );
};
