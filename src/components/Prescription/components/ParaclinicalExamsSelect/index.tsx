import { ReactNode, useEffect } from 'react';
import intl from 'react-intl-universal';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Form, Input, Radio, Select, Space } from 'antd';
import { IParaclinicalExamItemExtra } from 'api/form/models';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import { defaultFormItemsRules } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import { getNamePath, setFieldValue, setInitialValues } from 'components/Prescription/utils/form';
import { IAnalysisFormPart, IGetNamePathParams } from 'components/Prescription/utils/type';
import { usePrescriptionFormConfig } from 'store/prescription';

import styles from './index.module.scss';

type OwnProps = IAnalysisFormPart & {
  initialData?: IParaclinicalExamsDataType;
};

interface IParaclinicalExam {
  title: string;
  label?: ReactNode;
  extra?: (index: number) => ReactNode;
}

// eslint-disable-next-line
const DEFAULT_EXAMS: IParaclinicalExam[] = [
  {
    title: 'Créatine kinase sérique',
    extra: (name) => (
      <Form.Item wrapperCol={{ md: 12, lg: 12, xxl: 6 }} colon={false} label={<></>}>
        <ProLabel
          title="Valeur ou intervalle de valeurs en UI/L"
          colon
          size="small"
          popoverProps={{
            title: 'Bonjour',
            content: 'Aloo',
          }}
        />
        <Form.Item name={[name, 'creatine_level']} rules={defaultFormItemsRules}>
          <Input />
        </Form.Item>
      </Form.Item>
    ),
  },
  { title: 'EMG' },
  { title: 'IRM musculaire' },
  {
    title: 'Test répétitions CTG',
    label: (
      <ProLabel title="Test répétitions CTG" popoverProps={{ title: 'Bonjour', content: 'allo' }} />
    ),
  },
  {
    title: 'Test répétitions GCN',
    label: (
      <ProLabel title="Test répétitions GCN" popoverProps={{ title: 'Bonjour', content: 'allo' }} />
    ),
  },
  {
    title: 'Test délétions et duplication',
    label: (
      <ProLabel
        title="Test délétions et duplication"
        popoverProps={{ title: 'Bonjour', content: 'allo' }}
      />
    ),
  },
  {
    title: 'Biopsie musculaire',
    extra: (name) => (
      <Form.Item wrapperCol={{ xxl: 14 }} colon={false} label={<></>}>
        <ProLabel title="Spécifier tout ce qui s'applique" colon size="small" />
        <Form.Item name={[name, 'biopsie_values']} rules={defaultFormItemsRules}>
          <Select mode="multiple" placeholder="Sélectionner" />
        </Form.Item>
      </Form.Item>
    ),
  },
];

export enum PARACLINICAL_EXAMS_FI_KEY {
  EXAMS = 'paraclinical_exams',
  OTHER_EXAMS = 'paraclinical_other_exams',
}

export enum PARACLINICAL_EXAM_ITEM_KEY {
  CODE = 'code',
  INTERPRETATION = 'interpretation',
}

export enum ParaclinicalExamStatus {
  NOT_DONE = 'not_done',
  ABNORMAL = 'abnormal',
  NORMAL = 'normal',
}

export interface IParaclinicalSignItem {
  [PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION]: string;
}

export interface IParaclinicalExamsDataType {
  [PARACLINICAL_EXAMS_FI_KEY.EXAMS]: IParaclinicalSignItem[];
  [PARACLINICAL_EXAMS_FI_KEY.OTHER_EXAMS]?: string;
}

const ParaclinicalExamsSelect = ({ form, parentKey, initialData }: OwnProps) => {
  const formConfig = usePrescriptionFormConfig();
  const getName = (...key: IGetNamePathParams) => getNamePath(parentKey, key);

  useEffect(() => {
    if (initialData && !isEmpty(initialData)) {
      setInitialValues(form, getName, initialData, PARACLINICAL_EXAMS_FI_KEY);
    } else {
      setFieldValue(
        form,
        getName(PARACLINICAL_EXAMS_FI_KEY.EXAMS),
        (formConfig?.paraclinical_exams.default_list ?? []).map((exam) => ({
          [PARACLINICAL_EXAM_ITEM_KEY.CODE]: exam.value,
          [PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION]: ParaclinicalExamStatus.NOT_DONE,
        })),
      );
    }
  }, []);

  const buildExtra =
    (extra: IParaclinicalExamItemExtra | undefined) =>
    // eslint-disable-next-line
    ({ name }: any) =>
      <>{extra?.label + name}</>;

  return (
    <div className={styles.paraExamsSelect}>
      <Form.List name={getName(PARACLINICAL_EXAMS_FI_KEY.EXAMS)}>
        {(fields) =>
          fields.map(({ key, name, ...restField }) => {
            const exam = formConfig?.paraclinical_exams.default_list[name]!;
            const title = exam.name;
            const extra = buildExtra(exam.extra);

            return (
              <div key={key} className={cx(styles.paraExamFormItem)}>
                <Space direction="vertical" className={styles.paraExamFormItemContent} size={5}>
                  <Form.Item
                    {...restField}
                    name={[name, PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION]}
                    label={title}
                  >
                    <Radio.Group>
                      <Radio value={ParaclinicalExamStatus.NOT_DONE}>{intl.get('not_done')}</Radio>
                      <Radio value={ParaclinicalExamStatus.ABNORMAL}>{intl.get('unnatural')}</Radio>
                      <Radio value={ParaclinicalExamStatus.NORMAL}>{intl.get('normal')}</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {extra && (
                    <Form.Item noStyle shouldUpdate>
                      {({ getFieldValue }) =>
                        getFieldValue(
                          getName(
                            PARACLINICAL_EXAMS_FI_KEY.EXAMS,
                            name,
                            PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION,
                          ),
                        ) === ParaclinicalExamStatus.ABNORMAL
                          ? extra(name)
                          : null
                      }
                    </Form.Item>
                  )}
                </Space>
              </div>
            );
          })
        }
      </Form.List>
      <Form.Item
        wrapperCol={{ xxl: 14 }}
        label="Autres examens paracliniques"
        name={getName(PARACLINICAL_EXAMS_FI_KEY.OTHER_EXAMS)}
        className={cx(styles.otherExamsTextarea, 'noMarginBtm')}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
    </div>
  );
};

export default ParaclinicalExamsSelect;
