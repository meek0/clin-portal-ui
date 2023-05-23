import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import AssignmentSelect from '@ferlab/ui/core/components/Assignments/AssignmentsSelect';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { Practitioner, PractitionerRole } from 'api/fhir/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { filter, find, orderBy } from 'lodash';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';

import styles from './index.module.scss';

export type TAssignmentsCell = {
  results: AnalysisResult;
  practitionerRolesBundle?: any[];
};

const getEmailfromPractionnerRole = (practitionerRole: PractitionerRole) =>
  practitionerRole?.telecom.find((t) => t.system === 'email');

export const getPractitionerInfoList = (practitionerRolesBundle?: any[]): TPractitionnerInfo[] => {
  const practitionerRoles: PractitionerRole[] = filter(
    practitionerRolesBundle,
    (p) => p.resourceType === 'PractitionerRole',
  );
  return practitionerRoles.reduce((acc: TPractitionnerInfo[], curr: PractitionerRole) => {
    const practitioner: Practitioner = find(
      practitionerRolesBundle,
      (p) => p.id === curr.practitioner.reference.split('/')[1],
    );
    const email = getEmailfromPractionnerRole(curr);
    const obj: TPractitionnerInfo = {
      practitionerRoles_Id: curr.id,
      name: practitioner.name,
      email: email?.value,
      ldm: curr.organization.reference.split('/')[1],
    };

    return [...acc, obj];
  }, []);
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
      >
        <div>
          <Avatar.Group
            size={24}
            maxCount={selectedAssignment.length <= 2 ? 2 : 1}
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
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
      >
        <Tooltip
          title={canAssign ? 'Assigner cette prescription' : 'Aucune assignation'}
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
