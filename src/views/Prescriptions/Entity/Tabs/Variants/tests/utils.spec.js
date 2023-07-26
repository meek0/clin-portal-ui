import { formatServiceRequestTag, getVariantType } from '../utils';

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
    expect(getVariantType(null)).toEqual('germline');
    expect(getVariantType({})).toEqual('germline');
    expect(getVariantType({ code: ['FOO'] })).toEqual('germline');
  });
  test('should return somatic_tumor_only', () => {
    const serviceRequest = {
      code: ['EXTUM'],
    };
    expect(getVariantType(serviceRequest)).toEqual('somatic_tumor_only');
  });
});
