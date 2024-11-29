/* eslint-disable complexity */
/* eslint-disable max-len */
import { Card, Col, Row, Space } from 'antd';
import { Rpt } from 'auth/types';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import ClassificationSection from './Sections/classifications';
import ClinicalAssociations from './Sections/clinicalAssociations';
import FamilySection from './Sections/family';
import FrequenciesGermlineSection from './Sections/frequenciesGermline';
import FrequenciesSomaticSection from './Sections/frequenciesSomatic';
import FunctionalScoresSection from './Sections/functionalScores';
import GeneSection from './Sections/gene';
import Header from './Sections/header';
import MetricSection from './Sections/metric';
import PredictionSection from './Sections/predictions';
import TranscriptSection from './Sections/transcript';
import ZygositySection from './Sections/zygosity';

import style from './index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  loadingRpt: boolean;
  rpt: Rpt;
  patientId: string;
  igvModalCb?: (record: VariantEntity) => void;
  variantSection?: VariantSection;
}

const OccurenceVariant = ({
  record,
  rpt,
  loadingRpt,
  igvModalCb,
  patientId,
  variantSection,
}: OwnProps) => (
  <>
    <Card
      className={`${style.occurenceVariant} ${style.card}`}
      title={
        <Header
          record={record}
          patientId={patientId}
          rpt={rpt}
          loadingRpt={loadingRpt}
          igvModalCb={igvModalCb}
        />
      }
      bordered={true}
    >
      <Space size={12} direction="vertical">
        <TranscriptSection record={record} />
        <Card className={style.card}>
          <Row gutter={24}>
            <>
              <Col flex={1}>
                <Space size={8} direction="vertical">
                  <ClassificationSection record={record} variantSection={variantSection} />
                  {variantSection === VariantSection.SNV && (
                    <PredictionSection record={record} patientId={patientId} />
                  )}
                  <GeneSection record={record} />
                </Space>
              </Col>
              <Col flex={1}>
                <Space size={8} direction="vertical">
                  {variantSection === VariantSection.SNV ? (
                    <FrequenciesGermlineSection record={record} />
                  ) : (
                    <FrequenciesSomaticSection record={record} />
                  )}
                  <FunctionalScoresSection record={record} variantSection={variantSection} />
                </Space>
              </Col>
            </>

            <Col flex={1}>
              <Space size={8} direction="vertical">
                <ZygositySection
                  record={record}
                  patientId={patientId}
                  variantSection={variantSection}
                />
                <ClinicalAssociations record={record} />
              </Space>
            </Col>
            <Col flex={1}>
              <Space direction="vertical">
                {variantSection === VariantSection.SNV && (
                  <FamilySection record={record} patientId={patientId} />
                )}
                <MetricSection
                  record={record}
                  patientId={patientId}
                  variantSection={variantSection}
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
    </Card>
  </>
);

export default OccurenceVariant;
