export type TInterpretationPubmed = {
  citation_id: string;
  citation: string;
};

export type TPubmedOutput = {
  id: string;
  nlm: {
    format: string;
  };
};

export type TInterpretationMetadata = {
  metadata?: {
    analysis_id?: string;
    patient_id?: string;
    variant_hash?: string;
  };
};

export type TInterpretationCommon = {
  hash: string;
  sequencing_id: string;
};

export type TInterpretationBase = {
  created_by: string;
  created_by_name: string;
  created_at: string;
  updated_by: string;
  updated_by_name: string;
  updated_at: string;
};

export type TInterpretationGermline = {
  condition: string | undefined;
  classification: string | undefined;
  classification_criterias: string[];
  transmission_modes: string[];
  interpretation: string;
  pubmed?: TInterpretationPubmed[];
};

export type TInterpretationSomatic = {
  tumoral_type: string | undefined;
  oncogenicity: string | undefined;
  oncogenicity_classification_criterias: string[];
  clinical_utility: string | undefined;
  interpretation: string;
  pubmed?: TInterpretationPubmed[];
};

export type TInterpretationGermlineOutput = TInterpretationBase & TInterpretationGermline;

export type TInterpretationSomaticOutput = TInterpretationBase & TInterpretationSomatic;

export type TInterpretationOutput = TInterpretationGermlineOutput | TInterpretationSomaticOutput;

export type TInterpretationGermlineInput = TInterpretationMetadata & TInterpretationGermline;

export type TInterpretationSomaticInput = TInterpretationMetadata & TInterpretationSomatic;

export type TInterpretationInput = TInterpretationGermlineInput | TInterpretationSomaticInput;

export type TMondoAutocompleteHit = {
  highlight: {
    name: string[];
    mondo_id: string[];
  };
  _source: {
    mondo_id: string;
    name: string;
  };
};

export type TMondoAutocompleteOutput = {
  hits: TMondoAutocompleteHit[];
};
