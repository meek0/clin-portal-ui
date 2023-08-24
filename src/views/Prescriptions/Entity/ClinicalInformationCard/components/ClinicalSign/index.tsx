import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Descriptions, Space } from 'antd';
import { PhenotypeRequestEntity } from 'api/fhir/models';
import { HpoApi } from 'api/hpo';
import { IHpoNode } from 'api/hpo/models';
import {
  useGeneralObservationEntity,
  useObservationPhenotypeEntity,
  useValueSet,
  useValueSetAgeOnset,
} from 'graphql/prescriptions/actions';
import { filter, find, map, some } from 'lodash';
import { EMPTY_FIELD, panelReflexCode, valueSetID } from 'views/Prescriptions/Entity/constants';

import { useLang } from 'store/global';

type ClinicalSignOwnProps = {
  phenotypeIds: string[];
  generalObervationId: string | undefined;
  prescriptionCode: string;
};

type IDOwnProps = {
  id: string;
};

const Observation = ({ id }: IDOwnProps) => {
  const { generalObervationValue } = useGeneralObservationEntity(id);
  return <>{generalObervationValue?.valueString}</>;
};

const addIfExist = (
  list: IHpoNode[],
  currentOption: IHpoNode,
  setList: Dispatch<SetStateAction<IHpoNode[]>>,
) => {
  !some(list, currentOption) ? setList([...list, currentOption]) : null;
};

const handleHpoSearchTerm = (
  term: string,
  setCurrentOptions: Dispatch<SetStateAction<IHpoNode | undefined>>,
) => {
  term
    ? HpoApi.searchHpos(term.toLowerCase().trim()).then(({ data, error }) => {
        if (!error) {
          const results = map(data?.hits, '_source');
          setCurrentOptions(results[0]);
        }
      })
    : null;
};
const getAnalysisCode = (prescriptionCode: string) => {
  if (panelReflexCode.includes(prescriptionCode)) {
    return valueSetID.mmgDefaultHpo;
  } else {
    return `${prescriptionCode.toLowerCase()}-default-hpo`;
  }
};

export const ClinicalSign = ({
  phenotypeIds,
  generalObervationId,
  prescriptionCode,
}: ClinicalSignOwnProps) => {
  const [currentHPOOptions, setCurrentHPOOptions] = useState<IHpoNode>();
  const [currentAgeOptions, setCurrentAgeOptions] = useState<IHpoNode>();
  const [hpoList, setHpoList] = useState<IHpoNode[]>([]);
  const [ageList, setAgeList] = useState<IHpoNode[]>([]);
  const { phenotypeValue } = useObservationPhenotypeEntity(phenotypeIds);
  const { ageAtOnsetValueSet } = useValueSetAgeOnset();
  const { valueSet } = useValueSet(getAnalysisCode(prescriptionCode));
  const lang = useLang();
  const getHpoValue = (element: PhenotypeRequestEntity) => {
    handleHpoSearchTerm(element.valueCodeableConcept?.coding?.code, setCurrentHPOOptions);
    element.extension
      ? handleHpoSearchTerm(element.extension.valueCoding?.code, setCurrentAgeOptions)
      : null;
  };

  useEffect(() => {
    if (phenotypeValue) {
      if (Array.isArray(phenotypeValue)) {
        phenotypeValue.forEach((element: PhenotypeRequestEntity) => {
          getHpoValue(element);
        });
      } else {
        getHpoValue(phenotypeValue);
      }
    }
  }, [phenotypeValue]);

  useEffect(() => {
    if (currentHPOOptions) {
      addIfExist(hpoList, currentHPOOptions, setHpoList);
    }
  }, [currentHPOOptions, hpoList]);

  useEffect(() => {
    if (currentAgeOptions) {
      addIfExist(ageList, currentAgeOptions, setAgeList);
    }
  }, [currentAgeOptions, ageList]);

  let positive = [];
  let negative = [];
  if (Array.isArray(phenotypeValue)) {
    positive = filter(phenotypeValue, (o) => o?.interpretation?.coding?.code === 'POS');

    negative = filter(phenotypeValue, (o) => o?.interpretation?.coding?.code === 'NEG');
  } else {
    positive = [phenotypeValue];
  }

  const displayHpo = (hpo: string, age: string = '') => {
    const hpoInfo = find(hpoList, (h: IHpoNode) => h.hpo_id === hpo);
    const ageInfo = find(ageList, (h: IHpoNode) => h.hpo_id === age);
    const ageValue = find(ageAtOnsetValueSet?.concept, (o) => o.code === ageInfo?.hpo_id);
    const hpoValue = find(valueSet?.concept, (o) => o.code === hpoInfo?.hpo_id);
    const ageDisplay = ageValue
      ? ` - ${
          find(ageValue?.designation, (o) => o.language === lang)
            ? find(ageValue?.designation, (o) => o.language === lang)?.value
            : ageValue.display
        }`
      : ` - ${ageInfo?.name}`;

    const hpoDisplay = hpoValue
      ? `${
          find(hpoValue?.designation, (o) => o.language === lang)
            ? find(hpoValue?.designation, (o) => o.language === lang)?.value
            : hpoValue.display
        }`
      : `${hpoInfo?.name}`;

    return `${hpoInfo ? hpoDisplay : ''} (${hpo})${ageInfo ? ageDisplay : ''}`;
  };

  return (
    <Descriptions column={1} size="small" className="label-20">
      <Descriptions.Item label={intl.get('screen.prescription.entity.observed')}>
        <Space direction="vertical">
          {positive.map((p: PhenotypeRequestEntity) =>
            displayHpo(p?.valueCodeableConcept?.coding.code, p?.extension?.valueCoding.code),
          )}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.prescription.entity.not.observed')}>
        {' '}
        <Space direction="vertical">
          {negative.length > 0
            ? negative.map((p: PhenotypeRequestEntity) =>
                displayHpo(p?.valueCodeableConcept?.coding.code),
              )
            : EMPTY_FIELD}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.prescription.entity.hpo.note')}>
        {generalObervationId ? <Observation id={generalObervationId} /> : EMPTY_FIELD}
      </Descriptions.Item>
    </Descriptions>
  );
};
