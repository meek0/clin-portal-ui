/* eslint-disable complexity */
/* eslint-disable max-len */
import { useState } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Row, Space, Tooltip } from 'antd';
import { Rpt } from 'auth/types';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import capitalize from 'lodash/capitalize';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { TAB_ID } from 'views/Snv/Entity';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import FemaleAffectedIcon from 'components/icons/FemaleAffectedIcon';
import FemaleNotAffectedIcon from 'components/icons/FemaleNotAffectedIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import MaleAffectedIcon from 'components/icons/MaleAffectedIcon';
import MaleNotAffectedIcon from 'components/icons/MaleNotAffectedIcon';
import { ReportNames } from 'store/reports/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatFilters } from 'utils/formatFilters';

import GqLine from '../GQLine';
import ReportButton from '../Report/DownloadButton';

import { HcComplementDescription } from './HcDescription';
import SequencingMetricModal from './SequencingMetricModal';

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
}: OwnProps) => {
  const [modalOpened, setModalVisible] = useState(false);

  const donor = findDonorById(record?.donors, patientId);

  const getParentTitle = (who: 'mother' | 'father', id: string, affected: boolean) => {
    let AffectedIcon = null;

    if (affected) {
      AffectedIcon = who === 'mother' ? FemaleAffectedIcon : MaleAffectedIcon;
    } else {
      AffectedIcon = who === 'mother' ? FemaleNotAffectedIcon : MaleNotAffectedIcon;
    }

    return (
      <span className={style.parentStatusTitle}>
        {`${intl.get(`screen.patientsnv.drawer.${who}.genotype`)}`}
        {affected !== null ? (
          <Tooltip
            placement="right"
            title={
              affected
                ? intl.get('screen.patientsnv.drawer.affected')
                : intl.get('screen.patientsnv.drawer.notaffected')
            }
          >
            <span className={style.parentStatusIconWrapper}>
              <AffectedIcon className={style.parentStatusIcon} />
            </span>
          </Tooltip>
        ) : undefined}
      </span>
    );
  };
  return (
    <>
      <Card
        className={`${style.occurenceVariant} ${style.card}`}
        title={
          <Space size={24}>
            <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
              <Space>
                <span className={style.hgvsgLink}>{record?.hgvsg}</span>
                <ExternalLinkIcon height="14" width="14" className="anticon" />
              </Space>
            </Link>
            <Space>
              <ReportButton
                icon={<DownloadOutlined width={'16'} height={'16'} />}
                patientId={patientId!}
                variantId={record?.hgvsg}
                name={ReportNames.transcript}
                size={'small'}
                buttonText={intl.get('screen.patientsnv.drawer.download.report')}
              />
              <Button
                loading={loadingRpt}
                disabled={loadingRpt || !rpt}
                type="default"
                size="small"
                icon={<LineStyleIcon height="16" width="16" className="anticon" />}
                onClick={() => igvModalCb && igvModalCb(record)}
              >
                {intl.get('open.in.igv')}
              </Button>
            </Space>
            <Divider type="vertical" />
            <Space size={12}>
              <Button
                className={style.linkButton}
                type="link"
                target="_blank"
                size="small"
                href={`https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr${record?.chromosome}%3A${record?.start}-${record?.end}`}
              >
                {intl.get('ucsc')}
              </Button>
              {record?.rsnumber && (
                <Button
                  className={style.linkButton}
                  type="link"
                  target="_blank"
                  size="small"
                  href={`https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=${record.rsnumber}`}
                >
                  {intl.get('litvar')}
                </Button>
              )}
            </Space>
          </Space>
        }
        bordered={true}
      >
        <Card className={style.card}>
          <Row wrap={false} gutter={24}>
            <Col>
              <Descriptions
                className={style.basicBordered}
                bordered
                size="small"
                title={capitalize(intl.get('zygosity'))}
                column={1}
              >
                <Descriptions.Item label={capitalize(intl.get('zygosity'))}>
                  {donor?.zygosity
                    ? intl.get(`occurence.zygosity.${donor.zygosity}`)
                    : TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
                {variantSection === VariantSection.SNV && (
                  <>
                    <Descriptions.Item
                      label={capitalize(intl.get('compound.heterozygous.abbrev', { num: 0 }))}
                    >
                      <HcComplementDescription
                        hcComplements={donor?.hc_complement}
                        defaultText={TABLE_EMPTY_PLACE_HOLDER}
                        locus={record?.locus}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={capitalize(
                        intl.get('potential.compound.heterozygous.abbrev', { num: 0 }),
                      )}
                    >
                      <HcComplementDescription
                        hcComplements={donor?.possibly_hc_complement}
                        defaultText={TABLE_EMPTY_PLACE_HOLDER}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label={intl.get('screen.patientsnv.drawer.transmission')}>
                      {donor?.transmission
                        ? intl.get(`screen.patientsnv.drawer.transmission.${donor.transmission}`)
                        : TABLE_EMPTY_PLACE_HOLDER}
                    </Descriptions.Item>
                    <Descriptions.Item label={intl.get('screen.patientsnv.drawer.parental.origin')}>
                      {donor?.parental_origin
                        ? intl.get(
                            `screen.patientsnv.drawer.parental.origin.${donor.parental_origin}`,
                          )
                        : TABLE_EMPTY_PLACE_HOLDER}
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            </Col>
            <Col>
              <Space direction="vertical">
                {variantSection === VariantSection.SNV &&
                  (donor?.father_id || donor?.mother_id) && (
                    <Descriptions
                      className={style.basicBordered}
                      bordered
                      size="small"
                      title={capitalize(intl.get('family'))}
                      column={1}
                    >
                      {donor?.father_id && (
                        <Descriptions.Item
                          label={getParentTitle(
                            'father',
                            donor?.father_id!,
                            donor?.father_affected_status!,
                          )}
                        >
                          {donor?.father_calls ? (
                            <Space size={4}>
                              <>
                                <span>{donor?.father_calls.join('/')}</span>
                                <span>
                                  (
                                  <Button
                                    className={style.detailButton}
                                    size="small"
                                    onClick={() => setModalVisible(true)}
                                    type="link"
                                  >
                                    {intl.get('screen.patientsnv.drawer.detail')}
                                  </Button>
                                  )
                                </span>
                              </>
                            </Space>
                          ) : (
                            TABLE_EMPTY_PLACE_HOLDER
                          )}
                        </Descriptions.Item>
                      )}
                      {donor?.mother_id && (
                        <Descriptions.Item
                          label={getParentTitle(
                            'mother',
                            donor?.mother_id!,
                            donor?.mother_affected_status!,
                          )}
                        >
                          {donor?.mother_calls ? (
                            <Space size={4}>
                              <>
                                <span>{donor?.mother_calls.join('/')}</span>
                                <span>
                                  (
                                  <Button
                                    size="small"
                                    className={style.detailButton}
                                    onClick={() => setModalVisible(true)}
                                    type="link"
                                    data-cy="OpenSeqMetricModal"
                                  >
                                    {intl.get('screen.patientsnv.drawer.detail')}
                                  </Button>
                                  )
                                </span>
                              </>
                            </Space>
                          ) : (
                            TABLE_EMPTY_PLACE_HOLDER
                          )}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  )}
                <Descriptions
                  className={style.basicBordered}
                  bordered
                  size="small"
                  title={intl.get('screen.patientsnv.category_metric')}
                  column={1}
                >
                  <Descriptions.Item label={intl.get('screen.patientsnv.drawer.depth.quality')}>
                    {donor?.qd ?? TABLE_EMPTY_PLACE_HOLDER}
                  </Descriptions.Item>
                  <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allprof')}>
                    {donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
                  </Descriptions.Item>
                  <Descriptions.Item label={intl.get('screen.patientsnv.drawer.alltotal')}>
                    {donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
                  </Descriptions.Item>
                  {(variantSection === VariantSection.SNVTN ||
                    variantSection === VariantSection.SNVTO) && (
                    <Descriptions.Item label={intl.get('filters.group.donors.sq')}>
                      {donor?.sq ? donor?.sq : TABLE_EMPTY_PLACE_HOLDER}
                    </Descriptions.Item>
                  )}

                  {variantSection === VariantSection.SNV && (
                    <Descriptions.Item label={intl.get('screen.patientsnv.drawer.gq')}>
                      {<GqLine value={donor?.gq} />}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label={intl.get('screen.patientsnv.drawer.filter')}>
                    {formatFilters(donor?.filters)}
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Col>
          </Row>
        </Card>
      </Card>
      <SequencingMetricModal
        donor={donor}
        isModalOpen={modalOpened}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default OccurenceVariant;
