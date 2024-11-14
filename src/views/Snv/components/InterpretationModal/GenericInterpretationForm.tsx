import intl from 'react-intl-universal';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Form, Input } from 'antd';

import RichTextEditor from 'components/uiKit/RichTextEditor';

import { GenericInterpFormFields } from './types';

import styles from './GenericInterpretationForm.module.css';

const GenericInterpretationForm = () => {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        label={intl.get('modal.variant.interpretation.generic.interpretation')}
        name={GenericInterpFormFields.INTERPRETATION}
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
        <Form.List name={GenericInterpFormFields.PUBMED}>
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
                    name={[name, GenericInterpFormFields.PUBMUD_CITATION]}
                    style={{ flex: 1, marginBottom: 0 }}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 0, maxRows: 6 }}
                      defaultValue=""
                      placeholder={intl.get(
                        'modal.variant.interpretation.generic.citation-placeholder',
                      )}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <CloseOutlined
                      className={styles.addCitationIcon}
                      onClick={() => remove(name)}
                    />
                  ) : null}
                </div>
              ))}
              <Form.Item style={{ marginBottom: 0 }} shouldUpdate>
                {() => (
                  <Button
                    type="link"
                    style={{ paddingInline: 0 }}
                    onClick={() => add()}
                    disabled={
                      form.getFieldValue(GenericInterpFormFields.PUBMED).length &&
                      !form.getFieldValue(GenericInterpFormFields.PUBMED)[0]?.[
                        GenericInterpFormFields.PUBMUD_CITATION
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
