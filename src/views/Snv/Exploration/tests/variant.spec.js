import { getVariantColumns } from '../variantColumns';

describe('variant: table', () => {
  test('GnomaAD colonne Should look like this', () => {
    const expected = {
      key: 'external_frequencies.gnomad_genomes_3_1_1.af',
      title: 'gnomAD ',
      tooltip: 'gnomAD Genome 3.1.1 (fréquence)',
      dataIndex: 'external_frequencies',
    };
    const gnomADVariant = getVariantColumns().find(
      (v) => v.key === 'external_frequencies.gnomad_genomes_3_1_1.af',
    );
    expect(gnomADVariant).toMatchObject(expected);
  });
});
