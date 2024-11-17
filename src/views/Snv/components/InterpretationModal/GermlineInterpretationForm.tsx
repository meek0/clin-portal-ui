import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { AutoComplete, Form, Radio, Select, Tag, Tooltip } from 'antd';

import { classificationCriterias, getClassificationCriteriaColor, transmissionModes } from './data';
import GenericInterpretationForm from './GenericInterpretationForm';
import { GermlineInterpFormFields } from './types';

import styles from './index.module.css';

/**
 * Payload sample: 
 * 
 * {
    "condition": "Une condition",
    "classification": "LA26332-9",
    "classification_criterias": [
        "PS1",
        "PS2",
        "PM3"
    ],
    "transmission_modes": [
        "autosomal_dominant",
        "autosomal_recessive"
    ],
    "interpretation": "<p>Une description de l'interprétation</p>",
    "pubmed": [
        {
            "citation_id": "123456",
            "citation": "Hart ML, Kaupp M, Brun J, Aicher WK. Comparative phenotypic transcriptional characterization of human full-term placenta-derived mesenchymal stromal cells compared to bone marrow-derived mesenchymal stromal cells after differentiation in myogenic medium. Placenta. 2017 Jan;49:64-67. doi: 10.1016/j.placenta.2016.11.007. Epub 2016 Nov 16. PMID: 28012456."
        }
    ]
}
 */

const GermlineInterpretationForm = () => {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        label={
          <ProLabel title={intl.get('modal.variant.interpretation.germline.condition')} colon />
        }
        name={GermlineInterpFormFields.CONDITION}
        rules={[
          {
            required: true,
          },
        ]}
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
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              marginBottom: 12,
            }}
            shouldUpdate
          >
            <Radio.Group
              disabled={!form.getFieldValue(GermlineInterpFormFields.CONDITION)}
              className={styles.radioButton}
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
                    closeIcon={
                      <CloseOutlined
                        style={tagColor ? { color: `var(--${tagColor}-9)` } : undefined}
                      />
                    }
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
        rules={[
          {
            required: true,
          },
        ]}
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
