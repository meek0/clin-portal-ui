/* eslint-disable no-console */
import { useDispatch } from 'react-redux';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Descriptions, Form, Input } from 'antd';
import {
  findPractitionerRoleByOrganization,
  isPractitionerResident,
} from 'api/fhir/practitionerHelper';

import AnalysisForm from 'components/Prescription/Analysis/AnalysisForm';
import {
  defaultCollapseProps,
  defaultFormItemsRules,
  STEPS_ID,
} from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import { SubmissionStepMapping } from 'components/Prescription/Analysis/stepMapping';
import { PATIENT_DATA_FI_KEY } from 'components/Prescription/components/PatientDataSearch';
import { getNamePath } from 'components/Prescription/utils/form';
import { usePrescriptionForm } from 'store/prescription';
import { prescriptionFormActions } from 'store/prescription/slice';
import { useUser } from 'store/user';

import styles from './index.module.scss';

export enum SUBMISSION_REVIEW_FI_KEY {
  RESPONSIBLE_DOCTOR = 'responsible_doctor',
  GENERAL_COMMENT = 'general_comment',
}

const Submission = () => {
  const FORM_NAME = STEPS_ID.SUBMISSION;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { analysisData, config, currentStep, analysisType } = usePrescriptionForm();

  const getName = (...key: string[]) => getNamePath(FORM_NAME, key);

  const needToSelectSupervisor = () => {
    const org = getPrescribingOrg()!;
    const role = findPractitionerRoleByOrganization(user.practitionerRoles, org);

    return isPractitionerResident(role!) || true;
  };

  const getPrescribingOrg = () =>
    analysisData[STEPS_ID.PATIENT_IDENTIFICATION]?.[PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION];

  return (
    <>
      <AnalysisForm
        form={form}
        className={styles.submissionForm}
        name={FORM_NAME}
        layout="vertical"
        onFinish={() => {
          console.log('Format and send data to backend');
        }}
      >
        <div className={styles.supervisorCommentWrapper}>
          {needToSelectSupervisor() && (
            <Form.Item
              name={getName(SUBMISSION_REVIEW_FI_KEY.RESPONSIBLE_DOCTOR)}
              label={<ProLabel title="Veuillez identifier votre médecin résponsable" colon />}
              wrapperCol={{ xxl: 14 }}
              rules={defaultFormItemsRules}
            >
              <Input suffix={<SearchOutlined />} placeholder="Recherche par nom ou licence…" />
            </Form.Item>
          )}
          <Form.Item
            name={getName(SUBMISSION_REVIEW_FI_KEY.GENERAL_COMMENT)}
            label={<ProLabel title="Commentaire général" colon />}
            wrapperCol={{ xxl: 14 }}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      </AnalysisForm>
      <Collapse
        {...defaultCollapseProps}
        bordered
        defaultActiveKey={['analyse', ...(config?.steps.map(({ title }) => title) ?? [])]}
      >
        <CollapsePanel key="analyse" header="Analyse">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Analyse demandée">{analysisType}</Descriptions.Item>
            <Descriptions.Item label="Établissement préscripteur">
              {getPrescribingOrg()}
            </Descriptions.Item>
          </Descriptions>
        </CollapsePanel>
        {config?.steps
          .filter(({ title }) => title !== currentStep?.title)
          .map((step) => (
            <CollapsePanel
              key={step.title}
              header={step.title}
              extra={
                <FormOutlined
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(
                      prescriptionFormActions.goTo({
                        index: step.index!,
                        lastStepIsNext: true,
                      }),
                    );
                  }}
                />
              }
            >
              {SubmissionStepMapping[step.id]}
            </CollapsePanel>
          ))}
      </Collapse>
    </>
  );
};

export default Submission;
