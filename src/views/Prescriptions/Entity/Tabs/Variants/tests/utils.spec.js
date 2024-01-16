import {
  formatServiceRequestTag,
  getVariantTypeFromCNVVariantEntity,
  getVariantTypeFromServiceRequest,
  getVariantTypeFromSNVVariantEntity,
} from '../utils';

describe('formatServiceRequestTag', () => {
  test('should return empty if not codes', () => {
    expect(formatServiceRequestTag(null, null)).toEqual('');
  });
  test('should return analysis code only', () => {
    expect(formatServiceRequestTag('foo', null)).toEqual('foo');
  });
  test('should return analysis and sequencing codes', () => {
    expect(formatServiceRequestTag('foo', 'bar')).toEqual('foo | bar');
  });
});

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
