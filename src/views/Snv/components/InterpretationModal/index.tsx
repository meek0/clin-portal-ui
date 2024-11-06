import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Alert, Col, Modal, Row, Space } from 'antd';

import InterpretationForm from './InterpretationForm';

type TInterpretationModalProps = {
  isOpen: boolean;
  toggleModal(visible: boolean): void;
};

const InterpretationModal = ({ isOpen, toggleModal }: TInterpretationModalProps) => (
  <Modal
    open={isOpen}
    onCancel={() => toggleModal(false)}
    title="Interprétation clinique"
    centered
    width={1200}
    style={{ maxHeight: '95vh' }}
    bodyStyle={{
      maxHeight: 'calc(95vh - 120px)',
      overflowY: 'auto',
    }}
    cancelText="Annuler"
    okText="Sauvegarder"
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
            Dernière mise à jour : <span style={{ fontWeight: 500 }}>Jean-François Soucy</span>{' '}
            (LDM-CHUSJ) 1er février 2024, 13h01
          </div>
        }
        type="info"
        showIcon
      />
      <Row gutter={24}>
        <Col span={14}>
          <GridCard
            theme="shade"
            content={<InterpretationForm />}
            bodyStyle={{ overflow: 'visible' }}
            style={{ padding: 24 }}
          />
        </Col>
        <Col span={10}>
          <GridCard theme="light" content={<></>} />
        </Col>
      </Row>
    </Space>
  </Modal>
);

export default InterpretationModal;
