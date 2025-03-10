import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Alert, Col, Form, Modal, Row, Space, Spin } from 'antd';
import { InterpretationApi } from 'api/interpretation';
import {
  TInterpretationGermline,
  TInterpretationInput,
  TInterpretationOutput,
  TInterpretationSomatic,
} from 'api/interpretation/model';
import { format } from 'date-fns';
import { ITableVariantEntity } from 'graphql/variants/models';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import { globalActions } from 'store/global';

import AnnotationsGeneSection from '../OccurenceVariant/Sections/annotationsGene';
import AnnotationsVariantSection from '../OccurenceVariant/Sections/annotationsVariant';
import CancerHotspotSection from '../OccurenceVariant/Sections/cancerHotspot';
import ClassificationSection from '../OccurenceVariant/Sections/classifications';
import ClassificationSomaticSection from '../OccurenceVariant/Sections/classificationsSomatic';
import ClinicalAssociations from '../OccurenceVariant/Sections/clinicalAssociations';
import FrequenciesGermlineSection from '../OccurenceVariant/Sections/frequenciesGermline';
import GeneSection from '../OccurenceVariant/Sections/gene';
import PredictionSection from '../OccurenceVariant/Sections/predictions';
import TranscriptSection from '../OccurenceVariant/Sections/transcript';
import ZygositySection from '../OccurenceVariant/Sections/zygosity';

import GermlineInterpretationForm from './GermlineInterpretationForm';
import Header from './header';
import SomaticInterpretationForm from './SomaticInterpretationForm';
import {
  cleanInterpretationPayload,
  getInterpretationFormInitialValues,
  isSubsetEqual,
} from './utils';

import occurenceStyles from '../OccurenceVariant/index.module.css';
import styles from './index.module.css';

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
  const [saving, setSaving] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [interpretation, setInterpretation] = useState<TInterpretationOutput | null>(null);
  const dispatch = useDispatch();

  const isSomatic =
    variantSection === VariantSection.SNVTN || variantSection === VariantSection.SNVTO;

  const sequencingId = record.donors?.hits.edges[0].node.service_request_id!;
  const transcriptId = record.consequences?.hits?.edges.find(({ node }) => !!node.picked)?.node
    .ensembl_transcript_id!;

  const handleFinish = async (values: TInterpretationInput) => {
    setSaving(true);
    InterpretationApi.save(
      isSomatic
        ? {
            type: 'somatic',
            sequencing_id: sequencingId,
            locus_id: record.locus,
            transcript_id: transcriptId,
            data: cleanInterpretationPayload(values) as TInterpretationSomatic,
          }
        : {
            type: 'germline',
            sequencing_id: sequencingId,
            locus_id: record.locus,
            transcript_id: transcriptId,
            data: cleanInterpretationPayload(values) as TInterpretationGermline,
          },
    )
      .then((response) => {
        if (response.error) {
          dispatch(
            globalActions.displayNotification({
              type: 'error',
              message: intl.get('modal.variant.interpretation.notification.error.title'),
              description: intl.get('modal.variant.interpretation.notification.error.text'),
            }),
          );
        }
        if (response.data) {
          dispatch(
            globalActions.displayNotification({
              type: 'success',
              message: intl.get('modal.variant.interpretation.notification.success'),
            }),
          );
          setInterpretation(response.data);
          setHasChanged(false);
          toggleModal(false);
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      const fetchInterpretation = async () => {
        setInitLoading(true);
        InterpretationApi.fetch({
          type: isSomatic ? 'somatic' : 'germline',
          locus_id: record.locus,
          sequencing_id: sequencingId,
          transcript_id: transcriptId,
        })
          .then((response) => {
            if (response.data) {
              setInterpretation(response.data);
            }
          })
          .finally(() => {
            setInitLoading(false);
          });
      };

      fetchInterpretation();
    }
  }, [isOpen, isSomatic]);

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        toggleModal(false);
        setHasChanged(false);
        setInitLoading(true);
        form.resetFields();
      }}
      title={intl.get('modal.variant.interpretation.title')}
      centered
      width={1200}
      style={{ maxHeight: '95vh' }}
      bodyStyle={{
        height: 500,
        maxHeight: 'calc(95vh - 120px)',
        minHeight: 'calc(95vh - 120px)',
        overflowY: 'auto',
      }}
      cancelText={intl.get('modal.variant.interpretation.cancelText')}
      okText={intl.get('modal.variant.interpretation.okText')}
      onOk={form.submit}
      okButtonProps={{
        loading: saving,
        disabled: !hasChanged && interpretation !== null,
      }}
      className={styles.interpretationModal}
    >
      {initLoading ? (
        <div className={styles.loadingContainer}>
          <Spin />
        </div>
      ) : (
        <Space
          size="large"
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          {interpretation && (
            <Alert
              message={
                <div>
                  {intl.getHTML('modal.variant.interpretation.lastUpdate', {
                    name: interpretation.updated_by_name,
                    date: new Date(interpretation.updated_at),
                    updatedAtTime: format(new Date(interpretation.updated_at), "H'h'mm"),
                  })}
                </div>
              }
              type="info"
              showIcon
            />
          )}
          <Header record={record} isSomatic={isSomatic} />
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
                    initialValues={getInterpretationFormInitialValues(isSomatic, interpretation)}
                    onFinish={handleFinish}
                    validateMessages={{
                      required: intl.get('this.field.is.required'),
                    }}
                    onValuesChange={(changedValue) => {
                      if (interpretation) {
                        setHasChanged(
                          !isSubsetEqual(
                            interpretation,
                            cleanInterpretationPayload({
                              ...form.getFieldsValue(),
                              ...changedValue,
                            }),
                          ),
                        );
                      }
                    }}
                  >
                    {isSomatic ? <SomaticInterpretationForm /> : <GermlineInterpretationForm />}
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
                    {isSomatic ? (
                      <>
                        <ClassificationSomaticSection record={record} />
                        <CancerHotspotSection record={record} />
                        <AnnotationsVariantSection record={record} />
                        <AnnotationsGeneSection record={record} />
                      </>
                    ) : (
                      <>
                        <ClassificationSection record={record} variantSection={variantSection} />
                        <PredictionSection record={record} patientId={patientId} />
                        <FrequenciesGermlineSection record={record} />
                        <ZygositySection
                          record={record}
                          patientId={patientId}
                          variantSection={variantSection}
                        />
                        <GeneSection record={record} showRevel />
                        <ClinicalAssociations record={record} />
                      </>
                    )}
                  </Space>
                }
              />
            </Col>
          </Row>
        </Space>
      )}
    </Modal>
  );
};

export default InterpretationModal;
