import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { AutoComplete, Form, Radio, Select, Tag, Tooltip } from 'antd';
import intl from 'react-intl-universal';
import { GermlineInterpFormFields } from './types';
import GenericInterpretationForm from './GenericInterpretationForm';
import { classificationCriterias, getClassificationCriteriaColor, transmissionModes } from './data';
import { CloseOutlined } from '@ant-design/icons';

import styles from './GermlineInterpretationForm.module.css';

const GermlineInterpretationForm = () => {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        label={
          <ProLabel title={intl.get('modal.variant.interpretation.germline.condition')} colon />
        }
        name={GermlineInterpFormFields.CONDITION}
      >
        <AutoComplete
          placeholder={intl.get('modal.variant.interpretation.germline.condition-placeholder')}
          allowClear
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item
            label={
              <ProLabel
                title={intl.get('modal.variant.interpretation.germline.classification')}
                colon
              />
            }
            name={GermlineInterpFormFields.CLASSIFICATION}
            style={{
              marginBottom: 12,
            }}
            shouldUpdate
          >
            <Radio.Group
              disabled={!form.getFieldValue(GermlineInterpFormFields.CONDITION)}
              className={styles.classification}
            >
              <Radio.Button value="LA6668-3" className={styles.red}>
                {intl.get(
                  'modal.variant.interpretation.germline.classification-options.pathogenic',
                )}
              </Radio.Button>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.germline.classification-options.likelyPathogenic-tooltip',
                )}
              >
                <Radio.Button value="LA26332-9" className={styles.volcano}>
                  {intl.get(
                    'modal.variant.interpretation.germline.classification-options.likelyPathogenic',
                  )}
                </Radio.Button>
              </Tooltip>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.germline.classification-options.vus-tooltip',
                )}
              >
                <Radio.Button value="LA26333-7" className={styles.orange}>
                  {intl.get('modal.variant.interpretation.germline.classification-options.vus')}
                </Radio.Button>
              </Tooltip>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.germline.classification-options.likelyBenign-tooltip',
                )}
              >
                <Radio.Button value="LA26334-5" className={styles.lime}>
                  {intl.get(
                    'modal.variant.interpretation.germline.classification-options.likelyBenign',
                  )}
                </Radio.Button>
              </Tooltip>
              <Radio.Button value="LA6675-8" className={styles.green}>
                {intl.get('modal.variant.interpretation.germline.classification-options.benign')}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item name={GermlineInterpFormFields.CLASSIFICATION_CRITERIAS}>
            <Select
              placeholder={intl.get(
                'modal.variant.interpretation.germline.classificationCriteria-placeholder',
              )}
              disabled={!form.getFieldValue(GermlineInterpFormFields.CLASSIFICATION)}
              options={classificationCriterias}
              tagRender={({ label, ...props }) => {
                const tagColor = getClassificationCriteriaColor(props.value);

                return (
                  <Tag
                    closeIcon={<CloseOutlined style={{ color: `var(--${tagColor}-9)` }} />}
                    color={tagColor}
                    style={{ marginLeft: 4 }}
                    {...props}
                  >
                    {label}
                  </Tag>
                );
              }}
              mode="multiple"
            />
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item
        label={intl.get('modal.variant.interpretation.germline.modeOfTransmission')}
        name={GermlineInterpFormFields.TRANSMISSION_MODES}
      >
        <Select
          placeholder={intl.get(
            'modal.variant.interpretation.germline.modeOfTransmission-placeholder',
          )}
          options={transmissionModes}
          tagRender={({ label, ...props }) => (
            <Tag className={styles.filledBlueTag} style={{ marginLeft: 4 }} {...props}>
              {label}
            </Tag>
          )}
          mode="multiple"
        />
      </Form.Item>
      <GenericInterpretationForm />
    </>
  );
};

export default GermlineInterpretationForm;
