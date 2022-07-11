import { ArrangerResultsTree } from 'graphql/models';

export interface IVariantResultTree {
  cnv: ArrangerResultsTree<VariantEntity>;
}

export type ITableVariantEntity = VariantEntity & {
  key: string;
};

export type VariantEntity = {
  id: string;
  patient_id: string;
  name: string;
  chromosome: string;
  start: number;
  end: number;
  svlen: number;
  number_genes: number;
  filters: string[];
  cn: number;
  sm: number;
  bc: number;
  pe: number[];
};
