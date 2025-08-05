import {
  getVariantTypeFromCNVVariantEntity,
  getVariantTypeFromServiceRequest,
  getVariantTypeFromSNVVariantEntity,
} from '../utils';

describe('getVariantType', () => {
  test('should return germline by default', () => {
    expect(getVariantTypeFromServiceRequest(null)).toEqual('germline');
    expect(getVariantTypeFromServiceRequest({})).toEqual('germline');
    expect(getVariantTypeFromServiceRequest({ code: ['FOO'] })).toEqual('germline');
  });
  test('should return somatic', () => {
    expect(getVariantTypeFromServiceRequest({ code: ['EXTUM'] })).toEqual('somatic');
  });
});

describe('getVariantTypeFromSNVVariantEntity', () => {
  test('should return germline by default', () => {
    expect(getVariantTypeFromSNVVariantEntity(null)).toEqual('germline');
    expect(getVariantTypeFromSNVVariantEntity({})).toEqual('germline');
    expect(
      getVariantTypeFromSNVVariantEntity({
        donors: { hits: { edges: [{ node: { variant_type: 'germline' } }] } },
      }),
    ).toEqual('germline');
  });
  test('should return somatic', () => {
    expect(
      getVariantTypeFromSNVVariantEntity({
        donors: { hits: { edges: [{ node: { variant_type: 'somatic' } }] } },
      }),
    ).toEqual('somatic');
  });
});

describe('getVariantTypeFromCNVVariantEntity', () => {
  test('should return germline by default', () => {
    expect(getVariantTypeFromCNVVariantEntity(null)).toEqual('germline');
    expect(getVariantTypeFromCNVVariantEntity({})).toEqual('germline');
    expect(
      getVariantTypeFromCNVVariantEntity({
        variant_type: 'germline',
      }),
    ).toEqual('germline');
  });
  test('should return somatic', () => {
    expect(
      getVariantTypeFromCNVVariantEntity({
        variant_type: 'somatic',
      }),
    ).toEqual('somatic');
  });
});
