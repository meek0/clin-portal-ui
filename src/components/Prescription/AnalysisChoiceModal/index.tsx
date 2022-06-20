import { useDispatch } from 'react-redux';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Checkbox, Form, Modal, Select, Typography } from 'antd';

import { usePrescriptionForm } from 'store/prescription';
import { isMuscularAnalysisAndNotGlobal } from 'store/prescription/helper';
import { prescriptionFormActions } from 'store/prescription/slice';
import { MuscularAnalysisType, OtherAnalysisType } from 'store/prescription/types';

import {
  defaultFormItemsRules,
  defaultValidateMessages,
} from '../Analysis/AnalysisForm/ReusableSteps/constant';

import styles from './index.module.scss';

const { Text, Link } = Typography;

export enum ANALYSIS_CHOICE_FI_KEY {
  ANALYSIS_TYPE = 'analysis_type',
  ANALYSE_REFLEX = 'analyse_reflex',
}

const AnalysisChoiceModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { analysisChoiceModalVisible } = usePrescriptionForm();

  return (
    <Modal
      title="Choix de l'analyse"
      visible={analysisChoiceModalVisible}
      onCancel={() => {
        dispatch(prescriptionFormActions.cancel());
        form.resetFields();
      }}
      okText="Commencer"
      destroyOnClose
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={(value) => {
          dispatch(
            prescriptionFormActions.completeAnalysisChoice({
              type: value[ANALYSIS_CHOICE_FI_KEY.ANALYSIS_TYPE],
              extraData: {
                analyse_reflex: value[ANALYSIS_CHOICE_FI_KEY.ANALYSE_REFLEX],
              },
            }),
          );
          form.resetFields();
        }}
        validateMessages={defaultValidateMessages}
        layout="vertical"
      >
        <Form.Item
          label={
            <ProLabel
              title="Sélectionner la condition et le panel de gènes à analyser"
              popoverProps={{
                title: 'Choix de l&apos;analyse',
                content: (
                  <Text className={styles.analysisPopoverContent}>
                    Veuillez <Link>consulter la documentation</Link> pour obtenir la définition de
                    chaque analyse.
                  </Text>
                ),
              }}
              colon
            />
          }
          name={ANALYSIS_CHOICE_FI_KEY.ANALYSIS_TYPE}
          rules={defaultFormItemsRules}
          className="noMarginBtm"
        >
          <Select placeholder="Sélectionner">
            <Select.Option value={OtherAnalysisType.GLOBAL_DEVELOPMENTAL_DELAY}>
              Retard global de développement / Déficience intellectuelle (trio)
            </Select.Option>
            <Select.Option value={OtherAnalysisType.NUCLEAR_MITOCHONDRIOPATHY}>
              Mitochondriopathie nucléaire
            </Select.Option>
            <Select.OptGroup label="Maladie musculaire">
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_GLOBAL}>
                Maladies musculaires (panel global)
              </Select.Option>
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_DYSTROPHIES}>
                Dystrophies musculaires
              </Select.Option>
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_MALIGNANT_HYPERTHERMIA}>
                Hyperthermie maligne
              </Select.Option>
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_CONGENITAL_MYASTHENIA}>
                Myasthénies congénitales
              </Select.Option>
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_CONGENITAL_MYOPATHIES}>
                Myopathies congénitales
              </Select.Option>
              <Select.Option value={MuscularAnalysisType.MUSCULAR_DISEASE_RHABDOMYOLYSIS}>
                Rhabomyolyse
              </Select.Option>
            </Select.OptGroup>
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) =>
            isMuscularAnalysisAndNotGlobal(getFieldValue(ANALYSIS_CHOICE_FI_KEY.ANALYSIS_TYPE)) ? (
              <Form.Item
                name={ANALYSIS_CHOICE_FI_KEY.ANALYSE_REFLEX}
                valuePropName="checked"
                className="marginTop noMarginBtm"
              >
                <Checkbox>
                  Analyser en réflexe le panel global des maladies musculaires si aucun diagnostic
                  n&apos;est identifié depuis le panel spécialisé.
                </Checkbox>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) =>
            getFieldValue(ANALYSIS_CHOICE_FI_KEY.ANALYSIS_TYPE) ? (
              <Form.Item className="marginTop noMarginBtm">
                <Text>
                  Il est recommandé de consulter <Link>l&apos;algorithme clinique du RQDM</Link> sur
                  l&apos;analyse sélectionnée avant de procéder au formulaire de prescription.
                </Text>
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AnalysisChoiceModal;
