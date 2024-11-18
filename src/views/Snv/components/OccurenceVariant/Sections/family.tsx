import { useState } from 'react';
import intl from 'react-intl-universal';
import { Button, Descriptions, Space, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';

import FemaleAffectedIcon from 'components/icons/FemaleAffectedIcon';
import FemaleNotAffectedIcon from 'components/icons/FemaleNotAffectedIcon';
import MaleAffectedIcon from 'components/icons/MaleAffectedIcon';
import MaleNotAffectedIcon from 'components/icons/MaleNotAffectedIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import SequencingMetricModal from '../SequencingMetricModal';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  patientId: string;
}

const FamilySection = ({ record, patientId }: OwnProps) => {
  const donor = findDonorById(record?.donors, patientId);
  const [modalOpened, setModalVisible] = useState(false);

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
      <Descriptions
        className={style.basicBordered}
        bordered
        size="small"
        title={capitalize(intl.get('family'))}
        column={1}
      >
        {donor?.father_id && (
          <Descriptions.Item
            label={getParentTitle('father', donor?.father_id!, donor?.father_affected_status!)}
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
            label={getParentTitle('mother', donor?.mother_id!, donor?.mother_affected_status!)}
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
      <SequencingMetricModal
        donor={donor}
        isModalOpen={modalOpened}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default FamilySection;
