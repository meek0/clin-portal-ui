import React from 'react';
import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { AutoComplete, Form, Radio, Select, Tag, Tooltip } from 'antd';

import {
  clinicalUtilitys,
  getOncogenicityClassificationCriteriaColor,
  oncogenicityClassificationCriterias,
} from './data';
import GenericInterpretationForm from './GenericInterpretationForm';
import { SomaticInterpFormFields } from './types';

import styles from './index.module.css';

/**
 * Payload sample:
 *
 * {
    "tumoral_type": "Un type tumoral",
    "oncogenicity": "LA6668-3",
    "oncogenicity_classification_criterias": [
        "OS1",
        "OS3",
        "OP4"
    ],
    "clinical_utility": "category_ia",
    "interpretation": "<p>Une description de l'interprétation</p>",
    "pubmed": [
        {
            "citation_id": "123456",
            "citation": "Hart ML, Kaupp M, Brun J, Aicher WK. Comparative phenotypic transcriptional characterization of human full-term placenta-derived mesenchymal stromal cells compared to bone marrow-derived mesenchymal stromal cells after differentiation in myogenic medium. Placenta. 2017 Jan;49:64-67. doi: 10.1016/j.placenta.2016.11.007. Epub 2016 Nov 16. PMID: 28012456."
        }
    ]
}
 */

const SomaticInterpretationForm = () => {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        label={
          <ProLabel title={intl.get('modal.variant.interpretation.somatic.tumoralType')} colon />
        }
        name={SomaticInterpFormFields.TUMORAL_TYPE}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AutoComplete
          placeholder={intl.get('modal.variant.interpretation.somatic.tumoralType-placeholder')}
          allowClear
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item
            label={
              <ProLabel
                title={intl.get('modal.variant.interpretation.somatic.oncogenicity')}
                colon
              />
            }
            name={SomaticInterpFormFields.ONCOGENICITY}
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
              disabled={!form.getFieldValue(SomaticInterpFormFields.TUMORAL_TYPE)}
              className={styles.radioButton}
            >
              <Radio.Button value="LA6668-3" className={styles.red}>
                {intl.get('modal.variant.interpretation.somatic.oncogenicity-options.oncogenic')}
              </Radio.Button>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.somatic.oncogenicity-options.likelyOncogenic-tooltip',
                )}
              >
                <Radio.Button value="LA26332-9" className={styles.volcano}>
                  {intl.get(
                    'modal.variant.interpretation.somatic.oncogenicity-options.likelyOncogenic',
                  )}
                </Radio.Button>
              </Tooltip>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.somatic.oncogenicity-options.vus-tooltip',
                )}
              >
                <Radio.Button value="LA26333-7" className={styles.orange}>
                  {intl.get('modal.variant.interpretation.somatic.oncogenicity-options.vus')}
                </Radio.Button>
              </Tooltip>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.somatic.oncogenicity-options.likelyBenign-tooltip',
                )}
              >
                <Radio.Button value="LA26334-5" className={styles.lime}>
                  {intl.get(
                    'modal.variant.interpretation.somatic.oncogenicity-options.likelyBenign',
                  )}
                </Radio.Button>
              </Tooltip>
              <Radio.Button value="LA6675-8" className={styles.green}>
                {intl.get('modal.variant.interpretation.somatic.oncogenicity-options.benign')}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item name={SomaticInterpFormFields.ONCOGENICITY_CLASSIFICATION_CRITERIAS}>
            <Select
              placeholder={intl.get(
                'modal.variant.interpretation.somatic.classificationCriteria-placeholder',
              )}
              disabled={!form.getFieldValue(SomaticInterpFormFields.ONCOGENICITY)}
              options={oncogenicityClassificationCriterias}
              tagRender={({ label, ...props }) => {
                const tagColor = getOncogenicityClassificationCriteriaColor(props.value);

                return (
                  <Tag
                    closeIcon={
                      <CloseOutlined
                        style={tagColor ? { color: `var(--${tagColor}-9)` } : undefined}
                      />
                    }
                    className={tagColor ? undefined : styles.filledBlueTag}
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
        label={intl.get('modal.variant.interpretation.somatic.clinicalUtility')}
        name={SomaticInterpFormFields.CLINICAL_UTILITY}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder={intl.get('modal.variant.interpretation.somatic.clinicalUtility-placeholder')}
          options={clinicalUtilitys}
          tagRender={({ label, ...props }) => (
            <Tag className={styles.filledBlueTag} style={{ marginLeft: 4 }} {...props}>
              {label}
            </Tag>
          )}
        />
      </Form.Item>
      <GenericInterpretationForm />
    </>
  );
};

export default SomaticInterpretationForm;
