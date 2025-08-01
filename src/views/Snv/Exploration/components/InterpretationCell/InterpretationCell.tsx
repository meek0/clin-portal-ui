import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import {
  interpretationListHasInterpretation,
  TChangeInterpretationList,
  TInterpretationList,
} from 'views/Cnv/Exploration/variantColumns';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import InterpretationModal from 'views/Snv/components/InterpretationModal';

import styles from './InterpretationCell.module.css';

interface OwnProps {
  record: VariantEntity | ITableVariantEntity;
  variantSection?: VariantSection;
  interpretationList?: TInterpretationList;
  changeInterpretationList?: TChangeInterpretationList;
}

const InterpretationCell = ({
  record,
  variantSection,
  interpretationList,
  changeInterpretationList,
}: OwnProps) => {
  const { patientId } = usePrescriptionEntityContext();
  const sequencing_id = record.donors?.hits?.edges?.[0]?.node?.service_request_id;
  const [isInterpretationModalOpen, toggleInterpretationModal] = useState(false);
  const [hasInterpretation, setHasInterpretation] = useState(false);
  useEffect(() => {
    setHasInterpretation(
      interpretationListHasInterpretation(interpretationList, record.hash, sequencing_id),
    );
  }, [interpretationList, record.hash, sequencing_id]);
  return (
    <div className={styles.interpretationCell}>
      {patientId && isInterpretationModalOpen && (
        <InterpretationModal
          isOpen={isInterpretationModalOpen}
          toggleModal={toggleInterpretationModal}
          record={record as ITableVariantEntity}
          variantSection={variantSection}
          changeInterpretationList={changeInterpretationList}
          hasInterpretation={hasInterpretation}
        />
      )}

      {hasInterpretation ? (
        <Tooltip title={intl.get('interpretation_Cell.tooltip_cell')}>
          <Button
            type="text"
            size="small"
            onClick={() => toggleInterpretationModal(true)}
            className={styles.interpretationButton}
            icon={<ThunderboltFilled className={styles.hasInterpretation} />}
          />
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('interpretation_Cell.tooltip_cell')}>
          <Button
            type="text"
            className={styles.interpretationButton}
            onClick={() => toggleInterpretationModal(true)}
            icon={<ThunderboltOutlined className={styles.noInterpretation} />}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default InterpretationCell;
