import { titleAndCodeExtractor } from 'utils/hpo';

describe('titleAndCodeExtractor', () => {
  test('Should format code', () => {
    expect(titleAndCodeExtractor(null, null)).toEqual(null);
    expect(titleAndCodeExtractor('foo (HP:bar)', '(HP:')).toEqual({ code: 'bar', title: 'foo' });
  });
});
