import {
  ALL_KEYS,
  buildVariantsDownloadCount,
  buildVariantsDownloadSqon,
  exportAsTSV,
  extractSelectionFromResults,
  makeFilenameDatePart,
  MAX_VARIANTS_DOWNLOAD,
} from '../export';

describe('exportAsTSV', () => {
  test('should be robust', () => {
    expect(exportAsTSV(null, null)).toEqual('');
    expect(exportAsTSV([{ foo: 'bar' }], null)).toEqual('');
  });
  test('should export data', () => {
    expect(exportAsTSV([{ foo: 'bar' }], ['foo'])).toEqual('foo\nbar\n');
  });
  test('should export array', () => {
    expect(exportAsTSV([{ foo: ['bar1', 'bar2'] }], ['foo'])).toEqual('foo\nbar1 bar2\n');
  });
  test('should export object', () => {
    expect(exportAsTSV([{ foo: {} }], ['foo'])).toEqual('foo\nN/A\n');
  });
  test('should export at least headers', () => {
    expect(exportAsTSV([], ['foo'])).toEqual('foo\n');
  });
});

describe('makeFilenameDatePart', () => {
  test('should format datetime', () => {
    const date = new Date(2020, 10, 31, 12, 42, 35);
    // don't check hours since it will yield different result
    //  on different machine with different UTC
    expect(makeFilenameDatePart(date).slice(0, 9)).toEqual('20201201T');
  });
});

describe('buildVariantsDownloadCount', () => {
  test('should be robust', () => {
    expect(buildVariantsDownloadCount(null, 0)).toEqual(0);
  });
  test('should return 0 if no keys to download', () => {
    expect(buildVariantsDownloadCount([], 0)).toEqual(0);
  });
  test('should return 0 if download ALL but total is bigger than MAX', () => {
    expect(buildVariantsDownloadCount([ALL_KEYS], MAX_VARIANTS_DOWNLOAD + 1)).toEqual(0);
  });
  test('should return TOTAL if download ALL and total <= MAX', () => {
    expect(buildVariantsDownloadCount([ALL_KEYS], 10)).toEqual(10);
  });
  test('should return X if bellow MAX', () => {
    expect(buildVariantsDownloadCount(['1', '2', '3'], 10)).toEqual(3);
  });
  test('should return 0 if keys length bigger than MAX', () => {
    var keys = [];
    keys.length = MAX_VARIANTS_DOWNLOAD + 1;
    expect(buildVariantsDownloadCount(keys, 10)).toEqual(0);
  });
});

describe('buildVariantsDownloadSqon', () => {
  test('should be return empty sqon if no keys', () => {
    expect(buildVariantsDownloadSqon(null, 'key', {})).toEqual({
      content: [{ content: { field: 'key', index: 'Variants', value: [] }, op: 'in' }],
      op: 'and',
    });
  });
  test('should return filtered sqon when ALL', () => {
    expect(buildVariantsDownloadSqon([ALL_KEYS], 'key', {})).toEqual({});
  });
  test('should return sqon by keys if selection of rows', () => {
    expect(buildVariantsDownloadSqon(['1', '2', '3'], 'key', {})).toEqual({
      content: [{ content: { field: 'key', index: 'Variants', value: ['1', '2', '3'] }, op: 'in' }],
      op: 'and',
    });
  });
});

describe('extractSelectionFromResults', () => {
  test('should filter by selection', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['bar'];
    const expected = [{ field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return all', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['*'];
    const expected = [{ foo: 'bar' }, { field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return nothing', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = [];
    const expected = [];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
});
