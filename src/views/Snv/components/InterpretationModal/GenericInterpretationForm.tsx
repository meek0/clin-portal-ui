import intl from 'react-intl-universal';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Form, Input } from 'antd';

import RichTextEditor from 'components/uiKit/RichTextEditor';

import { GenericInterpFormFields } from './types';

import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';

import styles from './index.module.css';
import { requiredRule } from './utils';
import { InterpretationApi } from 'api/interpretation';
import { TPubmedOutput } from 'api/interpretation/model';

const GenericInterpretationForm = () => {
  const form = Form.useFormInstance();

  const cacheRef = useRef(new Map());

  const fetchCitation = async (value: string, pubmedIndex: number) => {
    if (!value) return;

    if (cacheRef.current.has(value)) {
      const cachedData = cacheRef.current.get(value);
      updateCitationField(cachedData, pubmedIndex);
      return;
    }

    const { data, error } = await InterpretationApi.fetchPubmed(value);

    updateCitationField(data, pubmedIndex);

    if (error) {
      console.error('API Error:', error);
    } else {
      cacheRef.current.set(value, data); // Cache the result
    }
  };

  const debouncedFetchCitation = useCallback(
    debounce((value, index: number) => fetchCitation(value, index), 500), // Debounce delay of 500ms
    [],
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
    <>
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
                return (
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
                      hidden
                      name={[name, GenericInterpFormFields.PUBMED_CITATION_ID]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, GenericInterpFormFields.PUBMED_CITATION]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 0, maxRows: 6 }}
                        defaultValue=""
                        placeholder={intl.get(
                          'modal.variant.interpretation.generic.citation-placeholder',
                        )}
                        onChange={(e) => debouncedFetchCitation(e.target.value, name)}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <CloseOutlined
                        className={styles.addCitationIcon}
                        onClick={() => remove(name)}
                      />
                    ) : null}
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
    </>
  );
};

export default GenericInterpretationForm;
