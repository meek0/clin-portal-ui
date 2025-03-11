import { useState } from 'react';
import intl from 'react-intl-universal';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import InterpretationModal from 'views/Snv/components/InterpretationModal';

import styles from './InterpretationCell.module.css';

interface OwnProps {
  interpretation: string | null;
  record: VariantEntity | ITableVariantEntity;
  variantSection?: VariantSection;
}

const InterpretationCell = ({ interpretation, record, variantSection }: OwnProps) => {
  const { patientId } = usePrescriptionEntityContext();
  const [isInterpretationModalOpen, toggleInterpretationModal] = useState(false);

  return (
    <div className={styles.interpretationCell}>
      {patientId && (
        <InterpretationModal
          isOpen={isInterpretationModalOpen}
          toggleModal={toggleInterpretationModal}
          record={record as ITableVariantEntity}
          patientId={patientId}
          variantSection={variantSection}
        />
      )}

      {interpretation ? (
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
