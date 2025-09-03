import { ArrangerResultsTree } from 'graphql/models';
import {
  CosmicEntity,
  DddEntity,
  HpoEntity,
  OmimEntity,
  OrphanetEntity,
  VariantType,
} from 'graphql/variants/models';

export interface IVariantResultTree {
  cnv: ArrangerResultsTree<VariantEntity>;
}

export type ITableVariantEntity = VariantEntity & {
  key: string;
};

export type ITableGeneEntity = GeneEntity & {
  key: string;
};

export type VariantEntity = {
  id: string;
  variant_type: VariantType;
  bioinfo_analysis_code: string;
  patient_id: string;
  name: string;
  aliquot_id: string;
  hash: string;
  type: string;
  transmission: string;
  genome_build: string;
  parental_origin: string;
  qual: number;
  chromosome: string;
  sort_chromosome: number;
  start: number;
  end: number;
  reflen: number;
  number_genes: number;
  filters: string[];
  snv_count: number;
  calls: number[];
  cn: number;
  sm: number;
  bc: number;
  pe: number[];
  father_id: string;
  mother_id: string;
  father_aliquot_id?: string;
  mother_aliquot_id?: string;
  is_proband: string;
  gender: string;
  frequency_RQDM: FrequencyEntity;
  genes: ArrangerResultsTree<GeneEntity>;
  exomiser: ExomiserEntity;
  cluster: ClusterEntity;
};

export type ClusterEntity = {
  external_frequencies: {
    gnomad_exomes_4: {
      sf: number;
      sc: number;
    };
  };
  frequency_RQDM: {
    germ: {
      total: FrequencyEntity;
      affected: FrequencyEntity;
      non_affected: FrequencyEntity;
    };
    som: FrequencyEntity;
  };
};

export type FrequencyEntity = {
  pc: number;
  pf: number;
};
export type ExomiserEntity = {
  variant_score_category: string;
  variant_score: number;
  acmg_classification: string;
};

export type GeneEntity = {
  id: string;
  gene_length: number;
  overlap_bases: number;
  overlap_cnv_ratio: number;
  overlap_exons: number;
  overlap_gene_ratio: number;
  symbol: string;
  location: string;
  panels: string[];
  orphanet: ArrangerResultsTree<OrphanetEntity>;
  omim: ArrangerResultsTree<OmimEntity>;
  omim_gene_id?: string;
  hpo: ArrangerResultsTree<HpoEntity>;
  ddd: ArrangerResultsTree<DddEntity>;
  cosmic: ArrangerResultsTree<CosmicEntity>;
};
