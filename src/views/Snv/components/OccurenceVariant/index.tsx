/* eslint-disable complexity */
/* eslint-disable max-len */
import { Card, Col, Row, Space } from 'antd';
import { Rpt } from 'auth/types';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import ClassificationSection from './Sections/classifications';
import ClinicalAssociations from './Sections/clinicalAssociations';
import FamilySection from './Sections/family';
import FrequenciesSection from './Sections/frequencies';
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
        {variantSection === VariantSection.SNV && <TranscriptSection record={record} />}

        <Card className={style.card}>
          <Row wrap={false} gutter={24}>
            {variantSection === VariantSection.SNV && (
              <>
                <Col>
                  <Space size={8} direction="vertical">
                    <ClassificationSection record={record} />
                    <PredictionSection record={record} patientId={patientId} />
                    <GeneSection record={record} />
                  </Space>
                </Col>
                <Col>
                  <Space size={8} direction="vertical">
                    <FrequenciesSection record={record} />
                    <FunctionalScoresSection record={record} />
                  </Space>
                </Col>
              </>
            )}
            <Col>
              <Space size={8} direction="vertical">
                <ZygositySection
                  record={record}
                  patientId={patientId}
                  variantSection={variantSection}
                />
                {variantSection === VariantSection.SNV && <ClinicalAssociations record={record} />}
              </Space>
            </Col>
            <Col>
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
