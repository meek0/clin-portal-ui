import { SERVICE_REQUEST_CODE_MAP_KEY } from 'utils/constants';

import { transformNameIfNeeded } from '../nameTransformer';

describe('transformNameIfNeeded', () => {
  test('Should do nothing', () => {
    expect(transformNameIfNeeded('', '', '')).toEqual('');
  });
  test('Should transform lastNameFirstName', () => {
    expect(transformNameIfNeeded('lastNameFirstName', 'a,b,c', '')).toEqual('A b');
  });
  test('Should transform chromosome', () => {
    expect(transformNameIfNeeded('chromosome', '', 'true')).toEqual('1');
    expect(transformNameIfNeeded('chromosome', '', 'foo')).toEqual('foo');
  });
  test('Should transform laboratory', () => {
    expect(transformNameIfNeeded('laboratory', '', 'Organization/foo')).toEqual('foo');
  });
  test('Should transform analysis_code', () => {
    localStorage.setItem(
      SERVICE_REQUEST_CODE_MAP_KEY,
      JSON.stringify({ RGDI: { displayNameWithCode: 'code' } }),
    );
    expect(transformNameIfNeeded('analysis_code', 'RGDI', '')).toEqual('code');
  });
  test('Should transform _variant', () => {
    expect(transformNameIfNeeded('', '_variant', 'Variant_foo')).toEqual('_foo');
  });
  test('Should transform Other', () => {
    expect(transformNameIfNeeded('', 'other', 'bar')).toEqual('Autre');
  });
  test('Should transform affected', () => {
    expect(transformNameIfNeeded('', 'affected', 'status')).toEqual('status');
  });
});
