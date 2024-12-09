import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Flag } from '@ferlab/ui/core/components/Flag/FlagDropdown';
import { TFlagHistory } from '@ferlab/ui/core/components/Flag/types';
import { extractOrganizationId } from 'api/fhir/helper';
import { FlagApi } from 'api/flag';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { getPractitionerInfoList } from 'views/Prescriptions/utils/export';

import { globalActions } from 'store/global';
import { useUser } from 'store/user';
import { getFlagDictionary } from 'utils/translation';
interface OwnProps {
  options: string[];
  hash: string;
  variantType: string;
}

type THistory = {
  id: number;
  unique_id: string;
  author_id: string;
  organization_id: string;
  timestamp: string;
  properties: {
    flags: string[];
  };
};

const FlagCell = ({ options, hash, variantType }: OwnProps) => {
  const [selectedFlag, setSelectedFlag] = useState<string[]>(options);
  const [isPopOverOpen, setIsPopOverOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<THistory[]>([]);
  const { prescription, prescriptionId, patientId } = usePrescriptionEntityContext();

  const getOrganizationReference = prescription?.performer?.find((r) =>
    r.reference.includes('Organization'),
  );
  const dispatch = useDispatch();

  const { user } = useUser();
  const practitionerRolesBundle = user.practitionerRolesBundle;

  const practitionerInfoList = getPractitionerInfoList(practitionerRolesBundle);

  const handleSelect = (optionFlag: string) => {
    let newSelected: string[] = [];

    if (optionFlag !== 'none') {
      if (selectedFlag.includes(optionFlag)) {
        newSelected = selectedFlag.filter((s) => s !== optionFlag);
      } else {
        newSelected = [...selectedFlag, optionFlag];
      }
    }
    FlagApi.update(
      hash,
      prescriptionId!,
      patientId!,
      extractOrganizationId(getOrganizationReference?.reference!),
      variantType,
      {
        flags: newSelected,
      },
    ).then(({ error }) => {
      if (error) {
        dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('flag.error.title'),
            description: intl.get('flag.error.description'),
          }),
        );
      } else {
        setSelectedFlag(newSelected);
      }
    });
  };

  useEffect(() => {
    setIsPopOverOpen(history.length > 0);
  }, [history]);

  const handlePopOverHover = (open: boolean) => {
    if (open) {
      FlagApi.get(hash, prescriptionId!, patientId!, variantType).then(({ data }) => {
        setHistory(data.filter((d: THistory) => Array.isArray(d?.properties?.flags)));
      });
    } else {
      setIsPopOverOpen(false);
    }
  };

  const getHistoryInfo = () => {
    const historyInfoList: TFlagHistory[] = [];
    for (const h of history) {
      const practitioner = practitionerInfoList.find((p) => p.practitioner === h.author_id);
      const info: TFlagHistory = {
        name: practitioner?.name,
        options: h.properties.flags,
        date: h.timestamp,
      };
      historyInfoList.push(info);
    }
    return historyInfoList;
  };
  return (
    <>
      <Flag
        options={selectedFlag}
        dictionary={getFlagDictionary()}
        handleSelect={handleSelect}
        handlePopOverHover={handlePopOverHover}
        isPopOverOpen={isPopOverOpen}
        history={getHistoryInfo()}
      />
    </>
  );
};

export default FlagCell;
