import { TInterpretationCommon, TInterpretationInput } from 'api/interpretation/model';
import { ArrangerResultsTree } from 'graphql/models';

export interface IVariantResultTree {
  Variants: ArrangerResultsTree<VariantEntity>;
}

export enum Impact {
  High = 'HIGH',
  Moderate = 'MODERATE',
  Low = 'LOW',
  Modifier = 'MODIFIER',
}

export enum VariantType {
  GERMLINE = 'germline',
  SOMATIC = 'somatic',
}

export enum BioinfoAnalysisCode {
  GEBA = 'GEBA',
  TEBA = 'TEBA',
  TNBA = 'TNBA',
}

export type ExternalFrequenciesEntity = {
  topmed_bravo: BoundType;
  thousand_genomes: BoundType;
  gnomad_genomes_4: BoundType;
  gnomad_exomes_4: BoundType;
  gnomad_joint_4: BoundType;
};

export type FrequencyByAnalysisEntity = {
  id: string;
  analysis_code: string;
  affected: BoundType;
  non_affected: BoundType;
  total: BoundType;
};

export type frequency_RQDMEntity = {
  affected: BoundType;
  non_affected: BoundType;
  total: BoundType;
};

export type HcComplement = {
  symbol: string;
  locus: string[];
};

export type HcComplementHits = {
  hits: {
    edges: {
      node: HcComplement;
    }[];
  };
};

export type PossiblyHcComplement = {
  symbol: string;
  count: number;
};

export type PossiblyHcComplementHits = {
  hits: {
    edges: {
      node: PossiblyHcComplement;
    }[];
  };
};

export type TTableDonorEntity = DonorsEntity & {
  key: string;
};

export type DonorsEntity = {
  id: string;
  aliquot_id: string;
  patient_id: string;
  service_request_id: string;
  organization_id: string;
  gender: string;
  is_proband: boolean;
  family_id: string;
  last_update: number | string;
  ad_alt: number;
  ad_total: number;
  ad_ratio: number;
  affected_status: boolean;
  affected_status_code: string;
  all_analyses?: string[];
  qd: number;
  gq: number;
  cnv_count: number;
  sq: number;
  variant_type: VariantType;
  bioinfo_analysis_code: BioinfoAnalysisCode;
  filters?: string[];
  franklin_combined_score?: number;
  zygosity?: string;
  transmission?: string;
  analysis_code?: string;
  mother_id?: string;
  mother_aliquot_id?: string;
  mother_zygosity?: string;
  mother_affected_status?: boolean;
  mother_calls?: number[];
  mother_qd?: number;
  mother_ad_alt?: number;
  mother_ad_total?: number;
  mother_ad_ratio?: number;
  mother_gq?: number;
  father_id?: string;
  father_aliquot_id?: string;
  father_zygosity?: string;
  father_affected_status?: boolean;
  father_calls?: number[];
  father_qd?: number;
  father_ad_alt?: number;
  father_ad_total?: number;
  father_ad_ratio?: number;
  father_gq?: number;
  parental_origin?: string;
  is_possibly_hc?: boolean;
  possibly_hc_complement?: PossiblyHcComplementHits;
  analysis_service_request_id: string;
  hc_complement?: HcComplementHits;
  is_hc?: boolean;
  exomiser?: Exomiser;
};

export type Exomiser = {
  gene_combined_score: number;
  acmg_classification: string;
  acmg_evidence: string[];
};

export type ITableVariantEntity = VariantEntity & {
  key: string;
};

export type VariantEntity = {
  id: string;
  hash: string;
  hgvsg: string;
  locus: string;
  panels: string[];
  variant_class: string;
  rsnumber: string;
  flags: string[];
  interpretation?: TInterpretationCommon & TInterpretationInput;
  cmc: {
    sample_mutated: number;
    sample_ratio: number;
    mutation_url: string;
    cosmic_id: string;
    tier: string;
  };
  exomiser_max?: {
    variant_score: number;
    gene_combined_score: number;
    acmg_classification: string;
    acmg_evidence: string[];
  };
  franklin_max: {
    combined_score: number;
    acmg_classification: string;
    acmg_evidence: string[];
    link: string;
  };
  variant_type: VariantType[];
  freq_rqdm_tumor_normal: BoundType;
  freq_rqdm_tumor_only: BoundType;
  frequency_RQDM: frequency_RQDMEntity;
  consequences?: ArrangerResultsTree<ConsequenceEntity>;
  hotspot: boolean;
  genes?: ArrangerResultsTree<GeneEntity>;
  donors?: ArrangerResultsTree<DonorsEntity>;
  external_frequencies?: ExternalFrequenciesEntity;
  frequencies_by_analysis?: FrequencyByAnalysisEntity;
  chromosome: string;
  start: number;
  end: number;
  alternate: string;
  reference: string;
  assembly_version: string;
  clinvar: ClinVar;
  rsnumbermber: string;
  last_annotation_update: number;
};

export type GeneEntity = {
  id: string;
  omim_gene_id: string;
  ensembl_gene_id: string;
  symbol: string;
  location: string;
  alias: string[];
  orphanet: ArrangerResultsTree<OrphanetEntity>;
  omim: ArrangerResultsTree<OmimEntity>;
  hpo: ArrangerResultsTree<HpoEntity>;
  ddd: ArrangerResultsTree<DddEntity>;
  cosmic: ArrangerResultsTree<CosmicEntity>;
  biotype: string;
  spliceai: {
    ds: string | undefined;
    type: string[] | undefined;
  };
  gnomad: {
    pli: number | undefined;
    loeuf: number | undefined;
  };
};

export type ConsequenceEntity = {
  id: string;
  symbol: string;
  consequences: string[];
  vep_impact: Impact;
  aa_change: string | undefined | null;
  hgvsc: string;
  hgvsp: string;
  impact_score: number | null;
  canonical: boolean;
  mane_plus: boolean;
  mane_select: boolean;
  coding_dna_change: string;
  strand: string;
  refseq_mrna_id: string[];
  ensembl_transcript_id: string;
  ensembl_gene_id: string;
  predictions: PredictionEntity;
  conservations: ConservationsEntity;
  picked: null | boolean;
  exon: ExonEntity;
};

export type ExonEntity = {
  rank: string;
  total: number;
};

export type ConservationsEntity = {
  phylo_p17way_primate_score: number;
};

export type PredictionEntity = {
  fathmm_pred: number;
  fathmm_score: number;
  cadd_score: number;
  cadd_phred: number;
  dann_score: number;
  lrt_pred: string;
  lrt_score: number;
  revel_score: number;
  sift_score: number;
  sift_pred: string;
  polyphen2_hvar_score: number;
  polyphen2_hvar_pred: string;
  phyloP100way_vertebrate: number;
};

export type Consequence = {
  node: ConsequenceEntity;
};

export type Gene = {
  node: {
    id: string;
    omim_gene_id: string;
    symbol: string;
    omim: ArrangerResultsTree<{
      id: string;
      omim_id: string;
      name: string;
      inheritance_code: string[] | null;
    }>;
    ensembl_gene_id: string;
    gnomad: {
      loeuf: number;
      pli: number;
    };
    biotype: string;
  };
};

export type omim = ArrangerResultsTree<{
  id: string;
  omim_id: string;
  name: string;
  inheritance_code: string[] | null;
}>;

export type ClinVarData = string[] | undefined;

export type ClinVar = {
  clinvar_id: string | undefined;
  inheritance: ClinVarData;
  conditions: ClinVarData;
  clin_sig: ClinVarData;
  interpretations: ClinVarData;
};

export type BoundType = {
  ac?: number;
  af?: number;
  an?: number;
  hom?: number;
  pn: number;
  pc: number;
  pf: number;
};

export type OmimCondition = {
  omimName: string;
  omimId: string;
};
export type OmimConditions = OmimCondition[];

export type HpoCondition = {
  hpoTermLabel: string;
  hpoTermTermId: string;
};
export type HpoConditions = HpoCondition[];

export type OrphanetCondition = {
  panel: string;
  disorderId: number;
};
export type OrphanetConditions = OrphanetCondition[];

export type DddCondition = string;
export type DddConditions = DddCondition[];

export type CosmicCondition = string;
export type CosmicConditions = CosmicCondition[];

export type Conditions =
  | OmimConditions
  | HpoConditions
  | OrphanetConditions
  | DddConditions
  | CosmicConditions;

export type OrphanetInheritance = string[][];

export type OmimInheritance = string[][];

export type SingleValuedInheritance = string;

export type Inheritance = SingleValuedInheritance | OrphanetInheritance | OmimInheritance;

export type OmimGene = string[][];

export type CosmicEntity = {
  id: string;
  tumour_types_germline: string[];
};

export type DddEntity = {
  id: string;
  disease_name: string;
};

export type OrphanetEntity = {
  id: string;
  panel: string;
  inheritance: OrphanetInheritance | null | undefined;
  disorder_id: number;
};

export type HpoEntity = {
  id: string;
  hpo_term_label: string;
  hpo_term_id: string;
};

export type OmimEntity = {
  id: string;
  omim_id: string;
  name: string;
  inheritance: OmimInheritance | undefined | null;
  inheritance_code: string[] | null;
};

export enum ClinicalGenesTableSource {
  orphanet = 'Orphanet',
  omim = 'OMIM',
  hpo = 'HPO',
  ddd = 'DDD',
  cosmic = 'Cosmic',
}

export type FrequencyByLabEntity = BoundType & {
  id: string;
  lab_name: string;
};
