import intl from 'react-intl-universal';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { AutoComplete, Button, Form, Radio, Select, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import RichTextEditor from 'components/uiKit/RichTextEditor';

import styles from './form.module.css';

const InterpretationForm = () => (
  <Form layout="vertical">
    <Form.Item
      label={<ProLabel title={intl.get('modal.variant.interpretation.germline.condition')} colon />}
      name="condition"
    >
      <AutoComplete
        placeholder={intl.get('modal.variant.interpretation.germline.condition-placeholder')}
      />
    </Form.Item>
    <Form.Item
      label={
        <ProLabel title={intl.get('modal.variant.interpretation.germline.classification')} colon />
      }
      name="classification"
      style={{
        marginBottom: 12,
      }}
    >
      <Radio.Group>
        <Radio.Button value="LA6668-3">
          {intl.get('modal.variant.interpretation.germline.classificationOptions.pathogenic')}
        </Radio.Button>
        <Tooltip
          title={intl.get(
            'modal.variant.interpretation.germline.classificationOptions.likelyPathogenic-tooltip',
          )}
        >
          <Radio.Button value="LA26332-9">
            {intl.get(
              'modal.variant.interpretation.germline.classificationOptions.likelyPathogenic',
            )}
          </Radio.Button>
        </Tooltip>
        <Tooltip
          title={intl.get(
            'modal.variant.interpretation.germline.classificationOptions.vus-tooltip',
          )}
        >
          <Radio.Button value="LA26333-7">
            {intl.get('modal.variant.interpretation.germline.classificationOptions.vus')}
          </Radio.Button>
        </Tooltip>
        <Tooltip
          title={intl.get(
            'modal.variant.interpretation.germline.classificationOptions.likelyBenign-tooltip',
          )}
        >
          <Radio.Button value="LA26334-5">
            {intl.get('modal.variant.interpretation.germline.classificationOptions.likelyBenign')}
          </Radio.Button>
        </Tooltip>
        <Radio.Button value="LA6675-8">
          {intl.get('modal.variant.interpretation.germline.classificationOptions.benign')}
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item name="criteria-classification">
      <Select
        placeholder={intl.get(
          'modal.variant.interpretation.germline.classificationCriteria-placeholder',
        )}
      />
    </Form.Item>
    <Form.Item
      label={intl.get('modal.variant.interpretation.germline.modeOfTransmission')}
      name="transmission-mode"
    >
      <Select
        placeholder={intl.get(
          'modal.variant.interpretation.germline.modeOfTransmission-placeholder',
        )}
        mode="multiple"
      />
    </Form.Item>
    <Form.Item
      label={intl.get('modal.variant.interpretation.germline.interpretation')}
      name="interpretation"
    >
      <RichTextEditor />
    </Form.Item>
    <Form.Item
      label={
        <ProLabel
          title={intl.get('modal.variant.interpretation.germline.pubMedPublication')}
          colon
        />
      }
      style={{ marginBottom: 0 }}
    >
      <Form.List name="pubmed">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 12,
                  width: '100%',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Form.Item
                  {...restField}
                  name={[name, 'citation']}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <TextArea autoSize={{ minRows: 0, maxRows: 6 }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <CloseOutlined className={styles.addCitationIcon} onClick={() => remove(name)} />
                ) : null}
              </div>
            ))}
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="link" style={{ paddingInline: 0 }} onClick={() => add()}>
                <PlusOutlined /> {intl.get('modal.variant.interpretation.germline.addCitation')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  </Form>
);

export default InterpretationForm;
