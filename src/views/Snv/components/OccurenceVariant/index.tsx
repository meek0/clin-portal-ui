/* eslint-disable max-len */
import { useState } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Card, Col, Descriptions, Divider, Row, Space, Tooltip } from 'antd';
import { Rpt } from 'auth/types';
import { ITableVariantEntity, VariantEntity, VariantType } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import capitalize from 'lodash/capitalize';
import { TAB_ID } from 'views/Snv/Entity';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import FemaleAffectedIcon from 'components/icons/FemaleAffectedIcon';
import FemaleNotAffectedIcon from 'components/icons/FemaleNotAffectedIcon';
import MaleAffectedIcon from 'components/icons/MaleAffectedIcon';
import MaleNotAffectedIcon from 'components/icons/MaleNotAffectedIcon';
import { ReportNames } from 'store/reports/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatFilters } from 'utils/formatFilters';

import GqLine from '../GQLine';
import { HcComplementDescription } from '../OccurrenceDrawer/HcDescription';
import SequencingMetricModal from '../OccurrenceDrawer/SequencingMetricModal';
import ReportButton from '../Report/DownloadButton';

import style from './index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  loadingRpt: boolean;
  rpt: Rpt;
  patientId: string;
  igvModalCb?: (record: VariantEntity) => void;
}

const OccurenceVariant = ({ record, rpt, loadingRpt, igvModalCb, patientId }: OwnProps) => {
  const [modalOpened, setModalVisible] = useState(false);

  const donor = findDonorById(record.donors, patientId);

  const displayParentalOrigin = (parental_origin: string) =>
    intl.get(`filters.options.donors.parental_origin.${parental_origin}`)
      ? intl.get(`filters.options.donors.parental_origin.${parental_origin}`)
      : removeUnderscoreAndCapitalize(parental_origin || '').defaultMessage(
          TABLE_EMPTY_PLACE_HOLDER,
        );

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
        className={style.occurenceVariant}
        title={
          <Space size={24}>
            <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
              <Space>
                {record?.hgvsg}
                <ExternalLinkIcon height="14" width="14" className="anticon" />
              </Space>
            </Link>
            <Space>
              <Button
                loading={loadingRpt}
                disabled={loadingRpt || !rpt}
                type="default"
                size="small"
                onClick={() => igvModalCb && igvModalCb(record)}
              >
                {intl.get('open.in.igv')}
                <ExternalLinkIcon height="14" width="14" className="anticon" />
              </Button>
              <ReportButton
                icon={<DownloadOutlined width={'16'} height={'16'} />}
                patientId={patientId!}
                variantId={record?.hgvsg}
                name={ReportNames.transcript}
                tooltipTitle={intl.get('screen.patientsnv.drawer.download.report.tooltip')}
                size={'small'}
              />
            </Space>
            <Divider type="vertical" />
            <Space size={12}>
              <Button
                className={style.linkButton}
                type="link"
                target="_blank"
                size="small"
                href={`https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr${record.chromosome}%3A${record.start}-${record.end}`}
              >
                {intl.get('ucsc')}
              </Button>
              <Button
                className={style.linkButton}
                type="link"
                target="_blank"
                size="small"
                href={`https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=${record.rsnumber}`}
              >
                {intl.get('litvar')}
              </Button>
            </Space>
          </Space>
        }
        bordered={true}
      >
        <Card>
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
                <Descriptions.Item
                  label={capitalize(intl.get('compound.heterozygous.abbrev', { num: 0 }))}
                >
                  <HcComplementDescription
                    hcComplements={donor?.hc_complement}
                    defaultText={TABLE_EMPTY_PLACE_HOLDER}
                    locus={record.locus}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={capitalize(intl.get('potential.compound.heterozygous.abbrev', { num: 0 }))}
                >
                  <HcComplementDescription
                    hcComplements={donor?.possibly_hc_complement}
                    defaultText={TABLE_EMPTY_PLACE_HOLDER}
                  />
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.patientsnv.drawer.transmission')}>
                  {removeUnderscoreAndCapitalize(donor?.transmission! || '').defaultMessage(
                    TABLE_EMPTY_PLACE_HOLDER,
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.patientsnv.drawer.parental.origin')}>
                  {donor?.parental_origin
                    ? displayParentalOrigin(donor?.parental_origin)
                    : TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col>
              <Space direction="vertical">
                <Descriptions
                  className={style.basicBordered}
                  bordered
                  size="small"
                  title={capitalize(intl.get('family'))}
                  column={1}
                >
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
                </Descriptions>
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
                  <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allratio')}>
                    {donor?.ad_ratio ? donor?.ad_ratio.toFixed(2) : TABLE_EMPTY_PLACE_HOLDER}
                  </Descriptions.Item>
                  {record.variant_type.includes(VariantType.GERMLINE) && (
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
