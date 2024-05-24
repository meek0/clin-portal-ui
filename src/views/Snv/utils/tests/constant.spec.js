import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import { getQueryBuilderID } from '../constant';

describe('QueryBuilderId', () => {
  test('Should return the good queryBuilderID when SNV', () => {
    const variantSection = VariantSection.SNV;
    expect(getQueryBuilderID(variantSection)).toEqual('patient-variant-repo');
  });
  test('Should return the good queryBuilderID when SNV TO', () => {
    const variantSection = VariantSection.SNVTO;
    expect(getQueryBuilderID(variantSection)).toEqual('patient-variant-to-repo');
  });
  test('Should return the good queryBuilderID when SNV TN', () => {
    const variantSection = VariantSection.SNVTN;
    expect(getQueryBuilderID(variantSection)).toEqual('patient-variant-tn-repo');
  });
});
