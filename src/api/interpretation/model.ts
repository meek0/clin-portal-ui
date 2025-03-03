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

export type TInterpretationBase = {
  created_by: string;
  created_by_name: string;
  created_at: string;
  updated_by: string;
  updated_by_name: string;
  updated_at: string;
};

export type TInterpretationGermline = {
  condition: string;
  classification: string;
  classification_criterias: string[];
  transmission_modes: string[];
  interpretation: string;
  pubmed?: TInterpretationPubmed[];
};

export type TInterpretationSomatic = {
  tumoral_type: string;
  oncogenicity: string;
  oncogenicity_classification_criterias: string[];
  clinical_utility: string;
  interpretation: string;
  pubmed?: TInterpretationPubmed[];
};

export type TInterpretationGermlineOutput = TInterpretationBase & TInterpretationGermline;

export type TInterpretationSomaticOutput = TInterpretationBase & TInterpretationSomatic;

export type TInterpretationOutput = TInterpretationGermlineOutput | TInterpretationSomaticOutput;

export type TInterpretationGermlineInput = TInterpretationGermline;

export type TInterpretationSomaticInput = TInterpretationSomatic;

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
