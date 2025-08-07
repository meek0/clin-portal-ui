import { getMenuItems } from '../facets';

describe('Facets: getMenuItems', () => {
  test('should return something', () => {
    const variantMappingResults = {
      loading: true,
    };
    expect(
      getMenuItems({ variantMappingResults, filterMapper: null, customPillConfig: false }),
    ).toBeDefined();
  });
});
