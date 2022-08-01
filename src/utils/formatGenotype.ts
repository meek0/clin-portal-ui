export const formatGenotype = (genotype: number[]) =>
  genotype.map((val) => (val === -1 ? '.' : val)).join('/');
