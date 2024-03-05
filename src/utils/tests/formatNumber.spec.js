import { formatDnaLength, formatRatio } from 'utils/formatNumber';

describe('formatDnaLength', () => {
  test('Should be robust', () => {
    expect(formatDnaLength(null)).toEqual('0 bp');
    expect(formatDnaLength(0)).toEqual('0 bp');
  });
  test('Should format as expected', () => {
    expect(formatDnaLength(42.123)).toEqual('42.123 bp');
    expect(formatDnaLength(42000.123)).toEqual('42.0 kb');
    expect(formatDnaLength(420000000.123)).toEqual('420.0 Mb');
    expect(formatDnaLength(420000000.123, 2)).toEqual('420.00 Mb');
    expect(formatDnaLength(4200000000.123)).toEqual('4.2 Gb');
  });
});

describe('formatRatio', () => {
  test('Should be robust', () => {
    expect(formatRatio(null)).toEqual('0.0 %');
    expect(formatRatio(0)).toEqual('0.0 %');
  });
  test('Should format as expected', () => {
    expect(formatRatio(0.05)).toEqual('5.0 %');
    expect(formatRatio(0.55, 2)).toEqual('55.00 %');
  });
});
