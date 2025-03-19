import { useCallback, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Form, Radio, Select, Tag, Tooltip } from 'antd';
import { InterpretationApi } from 'api/interpretation';
import { TMondoAutocompleteHit } from 'api/interpretation/model';
import { capitalize, debounce } from 'lodash';

import {
  classificationCriterias,
  getClassificationCriteriaColor,
  getTransmissionModes,
} from './data';
import GenericInterpretationForm from './GenericInterpretationForm';
import InterpretationMondoOptionItem from './MondoOptionItem';
import { GermlineInterpFormFields } from './types';
import { requiredRule } from './utils';

import styles from './index.module.css';

const GermlineInterpretationForm = () => {
  const form = Form.useFormInstance();
  const [results, setResults] = useState<TMondoAutocompleteHit[]>([]);

  useEffect(() => {
    const initialContidition = form.getFieldValue(GermlineInterpFormFields.CONDITION);

    if (initialContidition) {
      handleSearch(initialContidition);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 500), // Debounce delay of 500ms
    [],
  );

  const handleSearch = async (searchValue: string) => {
    if (searchValue) {
      const { data } = await InterpretationApi.searchMondo(searchValue);
      setResults(data?.hits || []);
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <Form.Item
        label={
          <ProLabel
            popoverProps={{
              content: (
                <>
                  {intl.get('modal.variant.interpretation.germline.condition-popover')}
                  <ExternalLink href="https://www.ebi.ac.uk/ols4/ontologies/mondo">
                    {intl.get('modal.variant.interpretation.germline.condition-popover-link')}
                  </ExternalLink>
                </>
              ),
              placement: 'right',
            }}
            title={intl.get('modal.variant.interpretation.germline.condition')}
            colon
          />
        }
        name={GermlineInterpFormFields.CONDITION}
        rules={[requiredRule]}
      >
        <Select
          placeholder={intl.get('modal.variant.interpretation.germline.condition-placeholder')}
          showSearch
          allowClear
          onSearch={(value) => {
            if (value.length >= 3) {
              debouncedSearch(value);
            }
          }}
          optionLabelProp="display"
          optionFilterProp="filter"
          options={results.map((mondo) => ({
            display: capitalize(mondo._source.name),
            label: <InterpretationMondoOptionItem mondo={mondo} />,
            filter: `${mondo._source.name}${mondo._source.mondo_id}`,
            value: mondo._source.mondo_id,
          }))}
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item
            label={
              <ProLabel
                title={`${intl.get('modal.variant.interpretation.germline.classification')}`}
                popoverProps={{
                  content: (
                    <>
                      {intl.get(
                        'modal.variant.interpretation.germline.classification-popover-first',
                      )}
                      <ExternalLink href="https://pubmed.ncbi.nlm.nih.gov/25741868/">
                        {intl.get(
                          'modal.variant.interpretation.germline.classification-popover-link',
                        )}
                      </ExternalLink>
                      {intl.get(
                        'modal.variant.interpretation.germline.classification-popover-last',
                      )}
                    </>
                  ),
                  placement: 'right',
                }}
                colon
              />
            }
            name={GermlineInterpFormFields.CLASSIFICATION}
            rules={[requiredRule]}
            shouldUpdate
          >
            <Radio.Group className={styles.radioButton}>
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
          <Form.Item
            name={GermlineInterpFormFields.CLASSIFICATION_CRITERIAS}
            label={
              <ProLabel
                title={intl.get('modal.variant.interpretation.germline.classificationCriteria')}
                colon
              />
            }
          >
            <Select
              placeholder={intl.get(
                'modal.variant.interpretation.germline.classificationCriteria-placeholder',
              )}
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
        label={
          <ProLabel
            title={intl.get('modal.variant.interpretation.germline.modeOfTransmission')}
            colon
          />
        }
        name={GermlineInterpFormFields.TRANSMISSION_MODES}
        rules={[requiredRule]}
      >
        <Select
          placeholder={intl.get(
            'modal.variant.interpretation.germline.modeOfTransmission-placeholder',
          )}
          options={getTransmissionModes()}
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
