export enum GeneOverlapType {
  TYPE1 = 'type1',
  TYPE2 = 'type2',
  TYPE3 = 'type3',
}

/**
 * Type I:  cnvStart <= geneStart & cnvEnd >= geneEnd
 * Type II: cnvStart > geneStart & cnvEnd > geneEnd || cnvStart < geneStart & cnvEnd < geneEnd
 * Type III: cnvStart >= geneStart & cnvEnd <= geneEnd
 */
export const getGeneOverlapType = (
  cnvStart: number,
  cnvEnd: number,
  geneStart: number,
  geneEnd: number,
): GeneOverlapType => {
  if (cnvStart <= geneStart && cnvEnd >= geneEnd) {
    return GeneOverlapType.TYPE1;
  }

  if ((cnvStart > geneStart && cnvEnd > geneEnd) || (cnvStart < geneStart && cnvEnd < geneEnd)) {
    return GeneOverlapType.TYPE2;
  }

  return GeneOverlapType.TYPE3;
};
