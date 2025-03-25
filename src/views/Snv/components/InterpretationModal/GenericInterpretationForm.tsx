import { useCallback, useState } from 'react';
import intl from 'react-intl-universal';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Form, Input } from 'antd';
import { InterpretationApi } from 'api/interpretation';
import { TPubmedOutput } from 'api/interpretation/model';

import RichTextEditor from 'components/uiKit/RichTextEditor';

import { GenericInterpFormFields } from './types';
import { requiredRule } from './utils';

import styles from './index.module.css';

const GenericInterpretationForm = () => {
  const form = Form.useFormInstance();
  const [loadingPubmed, setLoadingPubmed] = useState(false);

  const fetchCitation = async (value: string, pubmedIndex: number) => {
    if (!value) return;

    const { data, error } = await InterpretationApi.fetchPubmed(value);

    updateCitationField(data, pubmedIndex);

    if (error) {
      console.error('API Error:', error);
    }
  };

  const handleFetchCitation = useCallback(
    (value: string, index: number) => {
      setLoadingPubmed(true);
      return fetchCitation(value, index).finally(() => setLoadingPubmed(false));
    },
    [fetchCitation],
  );

  const updateCitationField = (data: TPubmedOutput | undefined, pubmedIndex: number) => {
    if (data) {
      form.setFieldsValue({
        [GenericInterpFormFields.PUBMED]: form
          .getFieldValue(GenericInterpFormFields.PUBMED)
          .map((item: any, idx: any) =>
            idx === pubmedIndex
              ? {
                  ...item,
                  [GenericInterpFormFields.PUBMED_CITATION]: data.nlm.format,
                  [GenericInterpFormFields.PUBMED_CITATION_ID]: data.id.replace('pmid:', ''),
                }
              : item,
          ),
      });
    } else {
      form.setFields([
        {
          name: [
            GenericInterpFormFields.PUBMED,
            pubmedIndex,
            GenericInterpFormFields.PUBMED_CITATION,
          ],
          errors: [intl.get('modal.variant.interpretation.generic.pubMedIdNotFound')],
        },
      ]);
    }
  };

  return (
    <div className={styles.generic}>
      <Form.Item
        label={
          <ProLabel title={intl.get('modal.variant.interpretation.generic.interpretation')} colon />
        }
        name={GenericInterpFormFields.INTERPRETATION}
        rules={[requiredRule]}
      >
        <RichTextEditor />
      </Form.Item>
      <Form.Item
        label={
          <ProLabel
            title={intl.get('modal.variant.interpretation.generic.pubMedPublication')}
            popoverProps={{
              content: (
                <>
                  {intl.get('modal.variant.interpretation.generic.pubMedPublication-popover')}
                  <ExternalLink href="https://pubmed.ncbi.nlm.nih.gov/">
                    {intl.get(
                      'modal.variant.interpretation.generic.pubMedPublication-popover-link',
                    )}
                  </ExternalLink>
                </>
              ),
              placement: 'right',
            }}
            colon
          />
        }
        style={{ marginBottom: 0 }}
      >
        <Form.List
          name={GenericInterpFormFields.PUBMED}
          rules={[
            {
              validator: () => {
                const hasPubmedErrors = form
                  .getFieldsError()
                  .filter((error) => error.name.includes(GenericInterpFormFields.PUBMED))
                  .some((error) => error.errors.length > 0);

                if (hasPubmedErrors) {
                  return Promise.reject(new Error('Pubmed Error'));
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                const citation = form.getFieldValue([
                  GenericInterpFormFields.PUBMED,
                  name,
                  GenericInterpFormFields.PUBMED_CITATION,
                ]);
                const citationId = form.getFieldValue([
                  GenericInterpFormFields.PUBMED,
                  name,
                  GenericInterpFormFields.PUBMED_CITATION_ID,
                ]);

                return (
                  <div key={key} className={styles.citationContainer}>
                    <Form.Item
                      {...restField}
                      hidden
                      name={[name, GenericInterpFormFields.PUBMED_CITATION_ID]}
                    >
                      <Input />
                    </Form.Item>
                    {citation && citationId ? (
                      <div className={styles.citationWrapper}>
                        <div className={styles.citation}>{citation}</div>
                        <CloseOutlined
                          className={styles.addCitationIcon}
                          onClick={() => remove(name)}
                        />
                      </div>
                    ) : (
                      <Form.Item
                        {...restField}
                        name={[name, GenericInterpFormFields.PUBMED_CITATION]}
                        style={{ flex: 1, marginBottom: 0 }}
                      >
                        <Input.Search
                          defaultValue=""
                          placeholder={intl.get(
                            'modal.variant.interpretation.generic.citation-placeholder',
                          )}
                          onSearch={(value) => handleFetchCitation(value, name)}
                          enterButton
                          loading={loadingPubmed}
                          autoFocus
                        />
                      </Form.Item>
                    )}
                  </div>
                );
              })}
              <Form.Item style={{ marginBottom: 0 }} shouldUpdate>
                {() => (
                  <Button
                    type="link"
                    style={{ paddingInline: 0 }}
                    onClick={() => add()}
                    disabled={
                      form.getFieldValue(GenericInterpFormFields.PUBMED).length &&
                      !form.getFieldValue(GenericInterpFormFields.PUBMED)[0]?.[
                        GenericInterpFormFields.PUBMED_CITATION
                      ]
                    }
                  >
                    <PlusOutlined /> {intl.get('modal.variant.interpretation.generic.addCitation')}
                  </Button>
                )}
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </div>
  );
};

export default GenericInterpretationForm;
