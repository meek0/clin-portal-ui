import { useState } from 'react';
import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Descriptions, Divider, Drawer, Space, Tooltip } from 'antd';
import cx from 'classnames';
import { ArrangerEdge } from 'graphql/models';
import { DonorsEntity, VariantEntity } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';
import IGVModal from 'views/Variants/components/OccurrenceDrawer/IGVModal';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import FemaleAffectedIcon from 'components/icons/FemaleAffectedIcon';
import FemaleNotAffectedIcon from 'components/icons/FemaleNotAffectedIcon';
import MaleAffectedIcon from 'components/icons/MaleAffectedIcon';
import MaleNotAffectedIcon from 'components/icons/MaleNotAffectedIcon';
import { useRpt } from 'hooks/useRpt';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { getTopBodyElement } from 'utils/helper';

import { HcComplementDescription } from './HcDescription';
import ReportDownloadButton from './ReportDownloadButton';

import style from './index.module.scss';

interface OwnProps {
  patientId: string;
  data: VariantEntity;
  opened?: boolean;
  toggle: (opened: boolean) => void;
}

export const getDonor = (patientId: string, data: VariantEntity) => {
  const donors: ArrangerEdge<DonorsEntity>[] = data?.donors?.hits?.edges || [];
  const donor: ArrangerEdge<DonorsEntity> | undefined = donors.find(
    (donor) => donor.node.patient_id === patientId,
  );
  return donor?.node;
};

const getParentTitle = (who: 'mother' | 'father', id: string, affected: boolean) => {
  let AffectedIcon = null;

  if (affected) {
    AffectedIcon = who === 'mother' ? FemaleAffectedIcon : MaleAffectedIcon;
  } else {
    AffectedIcon = who === 'mother' ? FemaleNotAffectedIcon : MaleNotAffectedIcon;
  }

  return (
    <span className={cx(style.parentStatusTitle, 'parentStatusTitle')}>
      {`${intl.get(`screen.patientvariant.drawer.${who}.genotype`)} ${id ? `(${id})` : ''}`}
      {affected !== null ? (
        <Tooltip
          placement="right"
          title={
            affected
              ? intl.get('screen.patientvariant.drawer.affected')
              : intl.get('screen.patientvariant.drawer.notaffected')
          }
        >
          <span className={cx(style.parentStatusIconWrapper, 'parentStatusIconWrapper')}>
            <AffectedIcon className={cx(style.parentStatusIcon, 'parentStatusIcon')} />
          </span>
        </Tooltip>
      ) : undefined}
    </span>
  );
};

const OccurrenceDrawer = ({ patientId, data, opened = false, toggle }: OwnProps) => {
  const [modalOpened, toggleModal] = useState(false);
  const { loading: loadingRpt, rpt } = useRpt();

  const donor = getDonor(patientId, data);

  const hasAParent = donor?.father_id || donor?.mother_id;

  const variantId = data?.hgvsg;

  return (
    <>
      <Drawer
        title={<Tooltip title={variantId}>Occurrence</Tooltip>}
        placement="right"
        onClose={() => toggle(!opened)}
        visible={opened}
        closeIcon={<CloseOutlined size={16} />}
        width={500}
        className={cx(style.occurenceDrawer, 'occurenceDrawer')}
        getContainer={() => getTopBodyElement()}
      >
        <Space size="large" direction="vertical">
          <Descriptions column={1} className={cx(style.description, 'description')}>
            <Descriptions.Item label={'Variant'}>
              {variantId ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={'Patient'}>
              {patientId ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            column={1}
            className={cx(style.description, 'description')}
            title={capitalize(intl.get('zygosity'))}
          >
            <Descriptions.Item label={capitalize(intl.get('zygosity'))}>
              {donor?.zygosity ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item
              label={capitalize(intl.get('compound.heterozygous.abbrev', { num: 0 }))}
            >
              <HcComplementDescription
                hcComplements={donor?.hc_complement}
                defaultText={TABLE_EMPTY_PLACE_HOLDER}
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
          </Descriptions>
          {hasAParent && (
            <Descriptions
              title={capitalize(intl.get('family'))}
              column={1}
              className={cx(style.description, 'description')}
            >
              {donor?.mother_id && (
                <Descriptions.Item
                  label={getParentTitle(
                    'mother',
                    donor?.mother_id!,
                    donor?.mother_affected_status!,
                  )}
                >
                  {donor?.mother_calls ? donor?.mother_calls.join('/') : TABLE_EMPTY_PLACE_HOLDER}
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
                  {donor?.father_calls ? donor?.father_calls.join('/') : TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
              )}
              <Descriptions.Item label={intl.get('screen.patientvariant.drawer.transmission')}>
                {removeUnderscoreAndCapitalize(donor?.transmission! || '').defaultMessage(
                  TABLE_EMPTY_PLACE_HOLDER,
                )}
              </Descriptions.Item>
              <Descriptions.Item label={intl.get('screen.patientvariant.drawer.parental.origin')}>
                {donor?.parental_origin
                  ? capitalize(intl.get(donor?.parental_origin))
                  : TABLE_EMPTY_PLACE_HOLDER}
              </Descriptions.Item>
            </Descriptions>
          )}
          <Descriptions
            title={intl.get('screen.patientvariant.drawer.seq.method')}
            column={1}
            className={cx(style.description, 'description')}
          >
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.depth.quality')}>
              {donor?.qd ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.allprof')}>
              {donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.alltotal')}>
              {donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.allratio')}>
              {donor?.ad_ratio ? donor?.ad_ratio.toFixed(2) : TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.gq')}>
              {donor?.gq ? donor.gq : TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientvariant.drawer.filter')}>
              {donor?.filters}
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ margin: 0 }} />
          <Space>
            <Button
              loading={loadingRpt}
              disabled={loadingRpt || !rpt}
              type="primary"
              onClick={() => toggleModal(true)}
            >
              {intl.get('screen.patientvariant.drawer.igv.viewer')}
              <ExternalLinkIcon height="14" width="14" className="anticon" />
            </Button>
            <ReportDownloadButton patientId={patientId} variantId={variantId} />
          </Space>
        </Space>
      </Drawer>
      {donor && (
        <IGVModal
          rpt={rpt}
          donor={donor}
          variantEntity={data}
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default OccurrenceDrawer;
