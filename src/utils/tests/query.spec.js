import { EMPTY_QUERY, resolveSyntheticSqonWithReferences } from 'utils/query';

const QUERY_LIST = [
  { id: '0', op: 'and', content: [{ content: { field: 'foo' }, op: 'in' }] },
  { id: '1', op: 'or', content: [{ content: { field: 'bar' }, op: 'in' }] },
];

describe('resolveSyntheticSqonWithReferences', () => {
  test('Should be robust', () => {
    expect(resolveSyntheticSqonWithReferences(null, null)).toEqual(EMPTY_QUERY);
  });
  test('Should validate query with references only', () => {
    const query = {
      content: [0, 1],
      op: 'and',
    };
    const expected = {
      content: [
        { content: [{ content: { field: 'foo' }, op: 'in' }], op: 'and' },
        { content: [{ content: { field: 'bar' }, op: 'in' }], op: 'or' },
      ],
      op: 'and',
    };
    expect(resolveSyntheticSqonWithReferences(QUERY_LIST, query)).toEqual(expected);
  });
  test('Should validate query with some references', () => {
    const query = {
      content: [1, { content: { field: 'foo' }, op: 'in' }],
      op: 'and',
    };
    const expected = {
      content: [
        { op: 'or', content: [{ content: { field: 'bar' }, op: 'in' }] },
        { content: { field: 'foo' }, op: 'in' },
      ],
      op: 'and',
    };
    expect(resolveSyntheticSqonWithReferences(QUERY_LIST, query)).toEqual(expected);
  });
  test('Should ignore if references are missing', () => {
    const query = {
      content: [0, 1, 2],
      op: 'and',
    };
    expect(resolveSyntheticSqonWithReferences(QUERY_LIST, query)).toEqual(EMPTY_QUERY);
  });
  test('Should ignore if query list is empty', () => {
    const query = {
      content: [0, 1, 2],
      op: 'and',
    };
    expect(resolveSyntheticSqonWithReferences([], query)).toEqual(EMPTY_QUERY);
  });
});
