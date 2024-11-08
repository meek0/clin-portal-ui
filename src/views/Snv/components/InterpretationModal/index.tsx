import intl from 'react-intl-universal';
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
    title={intl.get('modal.variant.interpretation.title')}
    centered
    width={1200}
    style={{ maxHeight: '95vh' }}
    bodyStyle={{
      maxHeight: 'calc(95vh - 120px)',
      overflowY: 'auto',
    }}
    cancelText={intl.get('modal.variant.interpretation.cancelText')}
    okText={intl.get('modal.variant.interpretation.okText')}
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
            {intl.getHTML('modal.variant.interpretation.lastUpdate', {
              name: 'Jean-François Soucy',
              origin: 'LDM-CHUSJ',
              date: new Date(),
              time: new Date(),
            })}
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
