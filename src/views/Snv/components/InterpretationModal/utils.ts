import {
  TInterpretationGermline,
  TInterpretationGermlineOutput,
  TInterpretationInput,
  TInterpretationOutput,
  TInterpretationSomatic,
  TInterpretationSomaticOutput,
} from 'api/interpretation/model';

import { classificationMap } from './GermlineInterpretationForm';
import {
  GenericInterpFormFields,
  GermlineInterpFormFields,
  SomaticInterpFormFields,
} from './types';

const getGenericInterpFormInitialValues = (interpretation: TInterpretationOutput | null) => {
  if (interpretation) {
    return {
      [GenericInterpFormFields.INTERPRETATION]: interpretation.interpretation,
      [GenericInterpFormFields.PUBMED]: interpretation.pubmed?.length
        ? (interpretation.pubmed || []).map((pubmed) => ({
            [GenericInterpFormFields.PUBMED_CITATION_ID]: pubmed.citation_id,
            [GenericInterpFormFields.PUBMED_CITATION]: pubmed.citation,
          }))
        : [],
    };
  }

  return {
    [GenericInterpFormFields.INTERPRETATION]: '',
    [GenericInterpFormFields.PUBMED]: [],
  };
};

// TODO add correct type and fill initial form values
export const getGermlineInterpFormInitialValues = (
  interpretation: TInterpretationGermlineOutput | null,
  defaultClassificationCriterias: string[],
  defaultClassification: string,
): TInterpretationGermline => ({
  [GermlineInterpFormFields.CLASSIFICATION]:
    interpretation?.classification || defaultClassification,
  [GermlineInterpFormFields.CLASSIFICATION_CRITERIAS]:
    interpretation?.classification_criterias || defaultClassificationCriterias,
  [GermlineInterpFormFields.CONDITION]: interpretation?.condition,
  [GermlineInterpFormFields.TRANSMISSION_MODES]: interpretation?.transmission_modes || [],
  ...getGenericInterpFormInitialValues(interpretation),
});

// TODO add correct type and fill initial form values
export const getSimaticInterpFormInitialValues = (
  interpretation: TInterpretationSomaticOutput | null,
): TInterpretationSomatic => ({
  [SomaticInterpFormFields.TUMORAL_TYPE]: interpretation?.tumoral_type,
  [SomaticInterpFormFields.ONCOGENICITY]: interpretation?.oncogenicity,
  [SomaticInterpFormFields.ONCOGENICITY_CLASSIFICATION_CRITERIAS]:
    interpretation?.oncogenicity_classification_criterias || [],
  [SomaticInterpFormFields.CLINICAL_UTILITY]: interpretation?.clinical_utility,
  ...getGenericInterpFormInitialValues(interpretation),
});

export const getInterpretationFormInitialValues = (
  isSomatic: boolean,
  interpretation: TInterpretationOutput | null,
  hasInterpretation: boolean,
  acmgEvidence?: string[],
  acmgClassification?: string,
) => {
  const defaultClassificationCriterias: string[] = [];
  if (!hasInterpretation && !isSomatic && acmgEvidence?.length) {
    acmgEvidence.forEach((evidence) => {
      const evidenceOpt = evidence.split('_');
      defaultClassificationCriterias.push(evidenceOpt[0]);
    });
  }
  let defaultClassification = '';
  if (!hasInterpretation && !isSomatic && acmgClassification) {
    defaultClassification = classificationMap[acmgClassification];
  }
  return {
    ...(isSomatic
      ? getSimaticInterpFormInitialValues(interpretation as TInterpretationSomaticOutput)
      : getGermlineInterpFormInitialValues(
          interpretation as TInterpretationGermlineOutput,
          defaultClassificationCriterias,
          defaultClassification,
        )),
    ...getGenericInterpFormInitialValues(interpretation),
  };
};

export const requiredRule = {
  required: true,
};

export const isSubsetEqual = (obj1: any, obj2: any) => {
  for (const key in obj2) {
    if (typeof obj2[key] === 'object' && obj2[key] !== null) {
      // Check if array or nested object
      if (Array.isArray(obj2[key])) {
        if (!Array.isArray(obj1[key]) || JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          return false;
        }
      } else {
        if (!isSubsetEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
};

export const cleanInterpretationPayload = (input: TInterpretationInput): TInterpretationInput => {
  const cleanedPubmed = input.pubmed
    ? input.pubmed.filter((pubmed) => pubmed?.citation_id || pubmed?.citation)
    : undefined;

  return {
    ...input,
    pubmed: cleanedPubmed && cleanedPubmed.length ? cleanedPubmed : [],
  };
};
