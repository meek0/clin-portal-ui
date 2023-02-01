import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import get from 'lodash/get';

import { downloadText } from 'utils/helper';

export const ALL_KEYS = '*';
export const MAX_VARIANTS_DOWNLOAD = 10000;
export const VARIANT_KEY = 'hash';

const valueToStr = (value: any) => {
  if (value) {
    if (Array.isArray(value)) {
      return value.join(' ');
    } else if (typeof value === 'object') {
      return 'N/A';
    }
    return String(value);
  }
  return '';
};

export const buildVariantsDownloadCount = (keys: Array<string>, expectedTotal: number): number => {
  if (keys?.length > 0) {
    if (keys[0] === ALL_KEYS) {
      if (expectedTotal <= MAX_VARIANTS_DOWNLOAD) {
        return expectedTotal;
      } else {
        return 0;
      }
    } else if (keys.length <= MAX_VARIANTS_DOWNLOAD) {
      return keys.length;
    }
    return 0;
  }
  return 0;
};

export const buildVariantsDownloadSqon = (
  keys: Array<string>,
  key: string,
  filteredSqon: ISyntheticSqon,
): ISyntheticSqon => {
  if (keys?.[0] === ALL_KEYS) {
    return filteredSqon;
  } else {
    return {
      op: 'and',
      content: [
        {
          content: {
            field: key,
            value: keys || [],
          },
          op: 'in',
        },
      ],
    };
  }
};

export const exportAsTSV = (data: any[], headers: string[]): string => {
  let tsv = '';
  if (data && headers && headers.length > 0) {
    tsv += headers.join('\t');
    tsv += '\n';
    data.forEach((row) => {
      const values: string[] = [];
      headers.forEach((header) => {
        values.push(valueToStr(get(row, header, '')));
      });
      tsv += values.join('\t');
      tsv += '\n';
    });
  }
  return tsv;
};

export const downloadAsTSV = (
  data: any[],
  dataKeys: string[],
  key: string,
  columns: any[],
  prefix: string,
) => {
  const filtered = extractSelectionFromResults(data, dataKeys, key);
  const headers = columns.map((c) => c.key);
  const tsv = exportAsTSV(filtered, headers);
  downloadText(tsv, `${prefix}_${makeFilenameDatePart()}.tsv`, 'text/csv');
};

export const extractSelectionFromResults = (
  data: any[],
  dataKeys: string[],
  key: string,
): any[] => {
  if (dataKeys.length === 0) {
    return [];
  } else if (dataKeys.length === 1 && dataKeys[0] === ALL_KEYS) {
    return data;
  }
  return data.filter((row) => dataKeys.includes(row[key]));
};

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
