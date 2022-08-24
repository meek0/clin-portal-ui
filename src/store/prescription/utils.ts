import {
  CLINICAL_SIGN_NA,
  CLINICAL_SIGNS_FI_KEY,
  CLINICAL_SIGNS_ITEM_KEY,
  IClinicalSignsDataType,
} from 'components/Prescription/components/ClinicalSignsSelect';
import {
  IParaclinicalExamsDataType,
  PARACLINICAL_EXAM_ITEM_KEY,
  PARACLINICAL_EXAMS_FI_KEY,
  ParaclinicalExamStatus,
} from 'components/Prescription/components/ParaclinicalExamsSelect';

import { TCompleteAnalysis } from './types';

export const cleanAnalysisData = (analysis: TCompleteAnalysis) => {
  const analysisCopy = { ...analysis };

  if (analysisCopy.paraclinical_exams) {
    analysisCopy.paraclinical_exams = cleanParaclinicalExams(analysisCopy.paraclinical_exams);
  }

  if (analysisCopy.clinical_signs) {
    analysisCopy.clinical_signs = cleanClinicalSigns(analysisCopy.clinical_signs);
  }

  return analysisCopy;
};

const cleanParaclinicalExams = (
  paraclinicalData: IParaclinicalExamsDataType,
): IParaclinicalExamsDataType => ({
  ...paraclinicalData,
  exams: paraclinicalData[PARACLINICAL_EXAMS_FI_KEY.EXAMS].filter(
    (exam) => exam[PARACLINICAL_EXAM_ITEM_KEY.INTERPRETATION] !== ParaclinicalExamStatus.NOT_DONE,
  ),
});

const cleanClinicalSigns = (clinicalSigns: IClinicalSignsDataType): IClinicalSignsDataType => ({
  ...clinicalSigns,
  signs: clinicalSigns[CLINICAL_SIGNS_FI_KEY.SIGNS].filter(
    (sign) => sign[CLINICAL_SIGNS_ITEM_KEY.IS_OBSERVED] !== CLINICAL_SIGN_NA,
  ),
});
