import AssignmentsFilter from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { PractitionerBundleType, PractitionerRole } from 'api/fhir/models';
import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

import { useRpt } from 'hooks/useRpt';
import { getAssignmentDictionary } from 'utils/translation';

export type TAssignmentsFilter = {
  practitionerRolesBundle: PractitionerBundleType;
  confirm: (param?: FilterConfirmProps) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  clearFilters: (() => void) | undefined;
};

export const AssignmentsFilterDropdown = ({
  practitionerRolesBundle,
  clearFilters,
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
          const pr = p as unknown as PractitionerRole;
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
        confirm={confirm}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        clearFilters={clearFilters}
        dictionary={getAssignmentDictionary()}
      />
    </div>
  );
};
