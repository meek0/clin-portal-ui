import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Alert, Col, Form, Modal, Row, Space } from 'antd';

import GermlineInterpretationForm from './GermlineInterpretationForm';
import SomaticInterpretationForm from './SomaticInterpretationForm';
import { getGermlineInterpFormInitialValues } from './utils';
import TranscriptSection from '../OccurenceVariant/Sections/transcript';
import { ITableVariantEntity, VariantType } from 'graphql/variants/models';
import ClassificationSection from '../OccurenceVariant/Sections/classifications';

import PredictionSection from '../OccurenceVariant/Sections/predictions';
import FrequenciesGermlineSection from '../OccurenceVariant/Sections/frequenciesGermline';
import FrequenciesSomaticSection from '../OccurenceVariant/Sections/frequenciesSomatic';
import ZygositySection from '../OccurenceVariant/Sections/zygosity';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import GeneSection from '../OccurenceVariant/Sections/gene';
import ClinicalAssociations from '../OccurenceVariant/Sections/clinicalAssociations';
import Header from './header';

import styles from './index.module.css';
import occurenceStyles from '../OccurenceVariant/index.module.css';

type TInterpretationModalProps = {
  isOpen: boolean;
  toggleModal(visible: boolean): void;
  record: ITableVariantEntity;
  patientId: string;
  variantSection?: VariantSection;
};

const InterpretationModal = ({
  isOpen,
  toggleModal,
  record,
  patientId,
  variantSection,
}: TInterpretationModalProps) => {
  const [form] = Form.useForm();

  // TODO Fetch interpretation ??

  // TODO check if Germline or Somatic
  //const variantType: VariantType = VariantType.SOMATIC; // VariantType.SOMATIC;
  const isGermline = record.variant_type.includes(VariantType.GERMLINE);

  return (
    <Modal
      open={isOpen}
      onCancel={() => toggleModal(false)}
      title={intl.get('modal.variant.interpretation.title')}
      centered
      width={1200}
      style={{ maxHeight: '95vh' }}
      bodyStyle={{
        maxHeight: 'calc(95vh - 120px)',
        overflowY: 'auto',
      }}
      cancelText={intl.get('modal.variant.interpretation.cancelText')}
      okText={intl.get('modal.variant.interpretation.okText')}
      onOk={form.submit}
      className={styles.interpretationModal}
    >
      <Space
        size="large"
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert
          message={
            <div>
              {intl.getHTML('modal.variant.interpretation.lastUpdate', {
                name: 'Jean-François Soucy',
                date: new Date(),
                time: new Date(),
              })}
            </div>
          }
          type="info"
          showIcon
        />
        <Header record={record} />
        <div className={occurenceStyles.occurenceVariant}>
          <TranscriptSection record={record} />
        </div>
        <Row gutter={24}>
          <Col span={14}>
            <GridCard
              theme="shade"
              content={
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={getGermlineInterpFormInitialValues()}
                >
                  {isGermline ? <GermlineInterpretationForm /> : <SomaticInterpretationForm />}
                </Form>
              }
              bodyStyle={{ overflow: 'visible' }}
              style={{ padding: 24 }}
            />
          </Col>
          <Col span={10}>
            <GridCard
              theme="light"
              className={occurenceStyles.occurenceVariant}
              content={
                <Space size={16} direction="vertical" style={{ width: '100%' }}>
                  <ClassificationSection record={record} variantSection={variantSection} />
                  <PredictionSection record={record} patientId={patientId} />
                  {isGermline ? (
                    <FrequenciesGermlineSection record={record} />
                  ) : (
                    <FrequenciesSomaticSection record={record} />
                  )}
                  <ZygositySection
                    record={record}
                    patientId={patientId}
                    variantSection={variantSection}
                  />
                  <GeneSection record={record} />
                  <ClinicalAssociations record={record} />
                </Space>
              }
            />
          </Col>
        </Row>
      </Space>
    </Modal>
  );
};

export default InterpretationModal;
