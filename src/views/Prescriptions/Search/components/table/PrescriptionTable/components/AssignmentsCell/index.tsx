import { useState } from 'react';
import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import AssignmentSelect from '@ferlab/ui/core/components/Assignments/AssignmentsSelect';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { PractitionerRole } from 'api/fhir/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { orderBy } from 'lodash';
import {
  getEmailfromPractionnerRole,
  getPractitionerInfoList,
} from 'views/Prescriptions/utils/export';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { getAssignmentDictionary } from 'utils/translation';

import styles from './index.module.scss';

export type TAssignmentsCell = {
  results: AnalysisResult;
  practitionerRolesBundle?: any[];
};

export const putUserFirst = (
  practitionerInfoList: TPractitionnerInfo[],
  userPractitionerId: PractitionerRole,
) => {
  const newList = practitionerInfoList.filter(
    (p) => p.practitionerRoles_Id !== userPractitionerId.id,
  );
  const userInfo = practitionerInfoList.find(
    (p) => p.practitionerRoles_Id === userPractitionerId.id,
  );
  return userInfo ? [userInfo, ...newList] : practitionerInfoList;
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
  practitionerInfoList = orderBy(practitionerInfoList, (p) => p.name[0].family);
  if (decodedRpt) {
    const userPractitionerId = decodedRpt.fhir_practitioner_id;
    const userPractionnerRoles: PractitionerRole = practitionerRolesBundle?.find(
      (p) => p.practitioner?.reference.split('/')[1] === userPractitionerId,
    );
    practitionerInfoList = userPractionnerRoles
      ? putUserFirst(practitionerInfoList, userPractionnerRoles)
      : practitionerInfoList;
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
            {selectedAssignment.map((a, index) => {
              const assignedPractionnerRoles: PractitionerRole = practitionerRolesBundle?.find(
                (p) => p.id === a,
              );
              const email = getEmailfromPractionnerRole(assignedPractionnerRoles);
              return (
                <Gravatar key={index} circle email={email?.value ? email.value : ''} size={24} />
              );
            })}
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
          <Avatar
            className={
              canAssign
                ? styles.unAssagnAvatar
                : `${styles.unAssagnAvatar} ${styles.disabledAssignmentsPopOver}`
            }
            size={24}
            icon={<UserOutlined />}
          />
        </Tooltip>
      </Popover>
    </Space>
  );
};

export default AssignmentsCell;
