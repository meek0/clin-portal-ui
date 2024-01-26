import { getGeneOverlapType } from '../utils';

describe('Gene Overlap Type', () => {
  test('should return type 1', () => {
    const overlap_gene_ratio = 1;
    const overlap_cnv_ratio = 0.02;
    expect(getGeneOverlapType(overlap_gene_ratio, overlap_cnv_ratio)).toEqual('type1');
  });
  test('should return type 2', () => {
    const overlap_gene_ratio = 0.05;
    const overlap_cnv_ratio = 0.02;
    expect(getGeneOverlapType(overlap_gene_ratio, overlap_cnv_ratio)).toEqual('type2');
  });
  test('should return type 3', () => {
    const overlap_gene_ratio = 0.5;
    const overlap_cnv_ratio = 1;
    expect(getGeneOverlapType(overlap_gene_ratio, overlap_cnv_ratio)).toEqual('type3');
  });
});
