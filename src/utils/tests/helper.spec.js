import { downloadText, formatQuerySortList } from 'utils/helper';

describe('downloadText', () => {
  test('Should be robust', () => {
    downloadText(null, 'file.tsv');
  });
});

describe('Table sort', () => {
  test('Should return default sort if no sorter', () => {
    const sorting = {
      field: ['column2'],
      columnKey: 'column2',
    };
    const defaultSort = [
      {
        field: 'column1',
        order: 'desc',
      },
    ];

    expect(formatQuerySortList(sorting, defaultSort)).toEqual(defaultSort);
  });
  test('Should return correct column sort', () => {
    const sorting = {
      column: {
        key: 'column2',
        dataIndex: ['column2'],
        title: 'column Test',
        sorter: { multiple: 1 },
      },
      order: 'ascend',
      field: ['column2'],
      columnKey: 'column2',
    };

    const defaultSort = [
      {
        field: 'column1',
        order: 'desc',
      },
    ];

    const expectedSort = [
      {
        field: 'column2',
        order: 'asc',
      },
    ];

    expect(formatQuerySortList(sorting, defaultSort)).toEqual(expectedSort);
  });
});
