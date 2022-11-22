import { exportAsTSV, extractSelectionFromResults, makeFilenameDatePart } from '../export';

describe('exportAsTSV', () => {
  test('should be robust', () => {
    expect(exportAsTSV(null, null)).toEqual('');
    expect(exportAsTSV([{ foo: 'bar' }], null)).toEqual('');
  });
  test('should export data', () => {
    expect(exportAsTSV([{ foo: 'bar' }], ['foo'])).toEqual('foo\nbar\t\n');
  });
});

describe('makeFilenameDatePart', () => {
  test('should format datetime', () => {
    const date = new Date(2020, 10, 31, 12, 42, 35);
    expect(makeFilenameDatePart(date)).toEqual('20201201T174235Z');
  });
});

describe('extractSelectionFromResults', () => {
  test('should filter by selection', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['bar'];
    const expected = [{ field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
});
