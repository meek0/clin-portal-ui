import { getVariantColumns } from '../variantColumns';

describe('variant: table', () => {
  test('GnomaAD colonne Should look like this', () => {
    const expected = {
      key: 'external_frequencies',
      title: 'gnomAD ',
      tooltip: 'gnomAD Génomes 2.1.1',
      dataIndex: 'external_frequencies',
    };
    const gnomADVariant = getVariantColumns().find((v) => v.key === 'external_frequencies');
    expect(gnomADVariant).toMatchObject(expected);
  });
});
