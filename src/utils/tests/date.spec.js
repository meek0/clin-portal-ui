import { formatDate } from 'utils/date';

describe('formatDate', () => {
  test('should be valid date', () => {
    expect(formatDate('2024/01/22T00:00:00')).toEqual('2024-01-22');
  });
});
