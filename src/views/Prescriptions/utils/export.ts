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
