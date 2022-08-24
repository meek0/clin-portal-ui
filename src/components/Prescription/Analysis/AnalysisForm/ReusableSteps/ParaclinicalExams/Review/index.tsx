import intl from 'react-intl-universal';
import { Descriptions } from 'antd';

import { STEPS_ID } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import {
  IParaclinicalExamItem,
  PARACLINICAL_EXAM_ITEM_KEY,
  PARACLINICAL_EXAMS_FI_KEY,
  ParaclinicalExamStatus,
} from 'components/Prescription/components/ParaclinicalExamsSelect';
import { usePrescriptionForm, usePrescriptionFormConfig } from 'store/prescription';

const ParaclinicalExamsReview = () => {
  const { analysisData } = usePrescriptionForm();
  const formConfig = usePrescriptionFormConfig();

  formConfig?.paraclinical_exams;

  const getData = (key: PARACLINICAL_EXAMS_FI_KEY) =>
    analysisData[STEPS_ID.PARACLINICAL_EXAMS]?.[key] || [];

  const getExamNameByCode = (code: string) =>
    formConfig?.paraclinical_exams.default_list.find((exam) => exam.value === code)?.name;

  return (
    <Descriptions className="label-20" column={1} size="small">
      {(getData(PARACLINICAL_EXAMS_FI_KEY.EXAMS) as IParaclinicalExamItem[])
        .filter(
          (exam) =>
            exam[PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION] !== ParaclinicalExamStatus.NOT_DONE,
        )
        .map((exam, index) => (
          <Descriptions.Item
            key={index}
            label={getExamNameByCode(exam[PARACLINICAL_EXAM_ITEM_KEY.CODE])}
          >
            {intl.get(exam[PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION])}
          </Descriptions.Item>
        ))}
    </Descriptions>
  );
};

export default ParaclinicalExamsReview;
