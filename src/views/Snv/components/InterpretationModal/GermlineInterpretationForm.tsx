import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { AutoComplete, Form, Radio, Select, Tooltip } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { GermlineInterpFormFields } from './types';

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
            <Radio.Group disabled={!form.getFieldValue(GermlineInterpFormFields.CONDITION)}>
              <Radio.Button value="LA6668-3">
                {intl.get(
                  'modal.variant.interpretation.germline.classification-options.pathogenic',
                )}
              </Radio.Button>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.germline.classification-options.likelyPathogenic-tooltip',
                )}
              >
                <Radio.Button value="LA26332-9">
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
                <Radio.Button value="LA26333-7">
                  {intl.get('modal.variant.interpretation.germline.classification-options.vus')}
                </Radio.Button>
              </Tooltip>
              <Tooltip
                title={intl.get(
                  'modal.variant.interpretation.germline.classification-options.likelyBenign-tooltip',
                )}
              >
                <Radio.Button value="LA26334-5">
                  {intl.get(
                    'modal.variant.interpretation.germline.classification-options.likelyBenign',
                  )}
                </Radio.Button>
              </Tooltip>
              <Radio.Button value="LA6675-8">
                {intl.get('modal.variant.interpretation.germline.classification-options.benign')}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item name={GermlineInterpFormFields.CLASSIFICATION_CRITERIA}>
            <Select
              placeholder={intl.get(
                'modal.variant.interpretation.germline.classificationCriteria-placeholder',
              )}
              disabled={!form.getFieldValue(GermlineInterpFormFields.CLASSIFICATION)}
            />
          </Form.Item>
        )}
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
    </>
  );
};

export default GermlineInterpretationForm;
