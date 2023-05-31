import { useState } from 'react';
import intl from 'react-intl-universal';
import AssignmentSelect from '@ferlab/ui/core/components/Assignments/AssignmentsSelect';
import { UnAssignAvatar } from '@ferlab/ui/core/components/Assignments/AssignmentsTag/UnsassignAvatar';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { PractitionerRole } from 'api/fhir/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { getAssignmentDictionary } from 'utils/translation';

import styles from './index.module.scss';

export type TAssignmentsCell = {
  results: AnalysisResult;
  practitionerRolesBundle?: any[];
};

export const AssignmentsCell = ({
  results,
  practitionerRolesBundle,
}: TAssignmentsCell): React.ReactElement => {
  const [selectedAssignment, setSelectedAssignment] = useState<string[]>(results.assignments);

  const handleSelect = (practitionerRoles_ids: string[]) => {
    if (practitionerRoles_ids) {
      setSelectedAssignment(practitionerRoles_ids);
      FhirApi.prescriptionAssignment(results.prescription_id, practitionerRoles_ids);
    }
  };

  const { decodedRpt } = useRpt();
  const canAssign = decodedRpt ? validate([Roles.Variants], decodedRpt, false) : false;
  let practitionerInfoList = getPractitionerInfoList(practitionerRolesBundle);
  let selectedInfoList = practitionerInfoList.filter((r) =>
    selectedAssignment?.includes(r.practitionerRoles_Id),
  );
  if (decodedRpt) {
    const userPractitionerId = decodedRpt.fhir_practitioner_id;
    const userPractionnerRoles: PractitionerRole = practitionerRolesBundle?.find(
      (p) => p.practitioner?.reference.split('/')[1] === userPractitionerId,
    );

    if (userPractionnerRoles) {
      practitionerInfoList = putUserFirst(practitionerInfoList, userPractionnerRoles);
      selectedInfoList = putUserFirst(selectedInfoList, userPractionnerRoles);
    }
  }
  const content = (
    <AssignmentSelect
      dictionary={getAssignmentDictionary()}
      options={practitionerInfoList}
      handleSelect={handleSelect}
      assignedPractionnerRoles={selectedAssignment}
      visibleOptions={true}
    />
  );
  return selectedAssignment.length > 0 ? (
    <Space>
      <Popover
        overlayClassName={styles.assignmentsPopOver}
        placement="bottomLeft"
        trigger="click"
        content={content}
        visible={canAssign ? undefined : false}
        destroyTooltipOnHide
      >
        <div>
          <Avatar.Group
            size={24}
            maxCount={selectedAssignment.length <= 2 ? 2 : 1}
            maxStyle={{ color: '#006AA3', backgroundColor: '#D6F1FB' }}
            className={styles.assignementAvatar}
          >
            {selectedInfoList.map((p, index) => (
              <Gravatar key={index} circle email={p.email ? p.email : ''} size={24} />
            ))}
          </Avatar.Group>
        </div>
      </Popover>
    </Space>
  ) : (
    <Space>
      <Popover
        overlayClassName={styles.assignmentsPopOver}
        placement="bottomLeft"
        trigger="click"
        content={content}
        visible={canAssign ? undefined : false}
        destroyTooltipOnHide
      >
        <Tooltip
          title={
            canAssign ? intl.get('assignment.tooltip') : intl.get('assignment.tooltip.disable')
          }
          placement="top"
        >
          <div>
            <UnAssignAvatar canAssign />
          </div>
        </Tooltip>
      </Popover>
    </Space>
  );
};

export default AssignmentsCell;
