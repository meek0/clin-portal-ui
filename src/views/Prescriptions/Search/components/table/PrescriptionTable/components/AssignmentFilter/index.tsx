import { Key } from 'react';
import AssignmentsFilter from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import { IFilter } from '@ferlab/ui/core/components/filters/types';
import { updateQueryByTableFilter } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { PractitionerBundleType, PractitionerRole } from 'api/fhir/models';
import { PRESCRIPTION_QB_ID } from 'views/Prescriptions/Search/utils/contstant';
import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

import { useRpt } from 'hooks/useRpt';
import { getAssignmentDictionary } from 'utils/translation';

export type TAssignmentsFilter = {
  practitionerRolesBundle: PractitionerBundleType;
  confirm: (param?: FilterConfirmProps) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
};

const getSqonFiltersList = (selectedKeys: Key[]): IFilter[] =>
  selectedKeys.map((v: React.Key) => {
    if (v === 'noAssign') {
      return {
        data: {
          key: '__missing__',
          count: 0,
        },
        id: '__missing__',
        name: '__missing__',
      };
    }
    return {
      data: {
        key: v as string,
        count: 0,
      },
      id: v as string,
      name: v as string,
    };
  });

export const AssignmentsFilterDropdown = ({
  practitionerRolesBundle,
  confirm,
  selectedKeys,
  setSelectedKeys,
}: TAssignmentsFilter) => {
  const { decodedRpt } = useRpt();

  let practitionerInfoList = getPractitionerInfoList(practitionerRolesBundle);
  if (decodedRpt) {
    const userPractitionerId = decodedRpt.fhir_practitioner_id;
    const userPractionnerRoles: PractitionerRole | undefined = practitionerRolesBundle?.find(
      (p) => {
        if (p.resourceType === 'PractitionerRole') {
          const pr = p as PractitionerRole;
          return pr.practitioner?.reference.split('/')[1] === userPractitionerId;
        }
      },
    ) as PractitionerRole;
    practitionerInfoList = userPractionnerRoles
      ? putUserFirst(practitionerInfoList, userPractionnerRoles)
      : practitionerInfoList;
  }
  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <AssignmentsFilter
        options={practitionerInfoList}
        confirm={() => {
          updateQueryByTableFilter({
            queryBuilderId: PRESCRIPTION_QB_ID,
            field: 'assignments',
            selectedFilters: getSqonFiltersList(selectedKeys),
          });
          confirm();
        }}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        dictionary={getAssignmentDictionary()}
      />
    </div>
  );
};
