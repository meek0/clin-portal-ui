import { useState } from 'react';
import intl from 'react-intl-universal';
import { getPractitionnerName } from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import AssignmentSelect from '@ferlab/ui/core/components/Assignments/AssignmentsSelect';
import { AssignmentsTag } from '@ferlab/ui/core/components/Assignments/AssignmentsTag';
import { UnAssignAvatar } from '@ferlab/ui/core/components/Assignments/AssignmentsTag/UnsassignAvatar';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { Avatar, Button, Popover, Space, Tooltip, Typography } from 'antd';
import { FhirApi } from 'api/fhir';
import { PractitionerBundleType, PractitionerRole } from 'api/fhir/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { getAssignmentDictionary } from 'utils/translation';

import styles from './index.module.scss';

export type TAssignmentsCell = {
  results: AnalysisResult;
  practitionerRolesBundle?: PractitionerBundleType;
};

export type TAssignmentsData = {
  analysis_id: string;
  assignments: string[];
};

const userPopOverContent = (userInfos: TPractitionnerInfo[]) =>
  userInfos.map((ui) => (
    <Space direction="vertical" size={0} key={ui.practitionerRoles_Id}>
      <AssignmentsTag
        background={false}
        email={ui.email ? ui.email : ''}
        name={getPractitionnerName(ui.name)}
        organization={ui.ldm}
      />
      <Button
        onClick={(event) => {
          event.stopPropagation();
          window.location.href = `mailto:${ui.email ? ui.email : ''}`;
        }}
        className={styles.emailLink}
        type="link"
        size="small"
      >
        <Typography.Text
          className={styles.emailTextGroup}
          copyable={{
            tooltips: [
              intl.get('assignment.popOver.copy.tooltip'),
              intl.get('assignment.popOver.copy.tooltip.copied'),
            ],
          }}
          type="secondary"
        >
          <span className={styles.emailText}>{ui.email ? ui.email : ''}</span>
        </Typography.Text>
      </Button>
    </Space>
  ));

const renderAvatarGroup = (selectedInfoList: TPractitionnerInfo[]) => {
  const assigmentCount = selectedInfoList.length;
  return assigmentCount <= 2 ? (
    <div className={styles.assigmentCell}>
      {selectedInfoList.map((p, index) => (
        <Popover
          trigger="hover"
          key={p.practitionerRoles_Id}
          overlayClassName={styles.userPopOverContent}
          content={userPopOverContent([selectedInfoList[index]])}
        >
          <Gravatar key={index} circle email={p.email ? p.email : ''} size={24} />
        </Popover>
      ))}
    </div>
  ) : (
    <div className={styles.assigmentCell}>
      <Popover
        trigger="hover"
        overlayClassName={styles.userPopOverContent}
        content={userPopOverContent([selectedInfoList[0]])}
      >
        <Gravatar
          key={selectedInfoList[0].practitionerRoles_Id}
          circle
          email={selectedInfoList?.[0].email ? selectedInfoList[0].email : ''}
          size={24}
        />
      </Popover>
      <Popover
        trigger="hover"
        overlayClassName={styles.userPopOverContent}
        content={userPopOverContent(selectedInfoList)}
      >
        <Avatar className={styles.moreAssignment} size={24}>
          {`+${assigmentCount - 1}`}
        </Avatar>
      </Popover>
    </div>
  );
};

export const AssignmentsCell = ({
  results,
  practitionerRolesBundle,
}: TAssignmentsCell): React.ReactElement => {
  const [selectedAssignment, setSelectedAssignment] = useState<string[]>(results.assignments);

  const handleSelect = (practitionerRoles_ids: string[]) => {
    if (
      [...(practitionerRoles_ids || [])]?.sort().toString() !==
      [...(selectedAssignment || [])]?.sort().toString()
    ) {
      FhirApi.prescriptionAssignment(results.prescription_id, practitionerRoles_ids).then(
        ({ data }) => {
          setSelectedAssignment(data?.assignments ? data.assignments : []);
        },
      );
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
    const userPractionnerRoles: PractitionerRole | undefined = practitionerRolesBundle?.find(
      (p) => {
        if (p.resourceType === 'PractitionerRole') {
          const pr = p as PractitionerRole;
          return pr.practitioner?.reference.split('/')[1] === userPractitionerId;
        }
      },
    ) as PractitionerRole;

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
          <Space direction="horizontal">
            {selectedInfoList.length > 0 && renderAvatarGroup(selectedInfoList)}
          </Space>
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
