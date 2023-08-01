import { formatFilters } from 'utils/formatFilters';

describe('formatFilters', () => {
  test('Should be robust', () => {
    expect(formatFilters(null)).toEqual('-');
    expect(formatFilters('')).toEqual('-');
    expect(formatFilters([])).toEqual('-');
    expect(formatFilters(['', null, ' '])).toEqual('-');
  });
  test('Should format as expected', () => {
    expect(formatFilters(['base_quality', 'PASS', 'mapping_quality', 'DRAGENSnpHardQUAL'])).toEqual(
      'Base Quality, PASS, Mapping Quality, DRAGENSnpHardQUAL',
    );
  });
});
