import get from 'lodash/get';

export const exportAsTSV = (data: any[], headers: string[]): string => {
  let tsv = '';
  if (data && headers && data.length > 0 && headers.length > 0) {
    tsv += headers.join('\t');
    tsv += '\n';
    data.forEach((row) => {
      headers.forEach((header) => {
        tsv += String(get(row, header, '')) + '\t';
      });
      tsv += '\n';
    });
  }
  return tsv;
};

export const extractSelectionFromResults = (
  data: any[],
  selectedKeys: string[],
  key: string,
): any[] =>
  selectedKeys?.length > 0 // if no selection then download all
    ? data.filter((row) => selectedKeys.includes(row[key]))
    : data;

const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');

export const makeFilenameDatePart = (date = new Date()) => {
  const prefixes = joinWithPadding([
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  ]);
  const suffixes = joinWithPadding([
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ]);
  return `${prefixes}T${suffixes}Z`;
};
