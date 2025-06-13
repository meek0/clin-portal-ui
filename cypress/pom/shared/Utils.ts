/// <reference types="cypress"/>

/**
 * Constant represents one minute
 */
export const oneMinute = 60*1000;

/**
 * Regular expression matching a single digit.
 */
export const varSingleDigit = new RegExp('\\d{1}');

/**
 * Builds a RegExp that matches either of the two provided strings exactly.
 * Escapes special RegExp characters in both strings.
 * @param textEN The english string to match.
 * @param textFR The french string to match.
 * @returns A RegExp matching either textEN or textFR.
 */
export const buildBilingualRegExp = (textEN: string, textFR: string): RegExp => {
  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^(${escapeRegExp(textEN)}|${escapeRegExp(textFR)})$`);
};

/**
 * Formats a number to a string with 'K' for thousands (e.g., 13677 -> '13.7K').
 * @param value The value to format (string or number).
 * @returns The formatted string.
 */
export const formatToK = (value: string | number): string => {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  };

  return num.toString();
};

/**
 * Converts a variant string like 'chrX:g.123403094G>A' to the Franklin format.
 * @param variant The variant string.
 * @param upperCaseHG38 If true, use 'HG38' at the end, else 'hg38'.
 * @returns The formatted string for Franklin URLs.
 */
const formatVariantForFranklin = (variant: string, upperCaseHG38: boolean): string => {
  // Ex: 'chrX:g.123403094G>A' -> 'chrX-123403094-G-A-hg38' or 'chrX-123403094-G-A-HG38'
  const match = variant.match(/^chr(\w+):g\.(\d+)([ACGT])>([ACGT])$/i);
  if (!match) return '';
  const [_, chr, pos, ref, alt] = match;
  const hg38 = upperCaseHG38 ? 'HG38' : 'hg38';
  return `chr${chr}-${pos}-${ref}-${alt}-${hg38}`;
};

/**
 * Formats a number to a string with a space as the thousands separator (e.g., 13677 -> '13 677').
 * If a RegExp is provided, returns its source.
 * @param value The value to format (string, number, or RegExp).
 * @returns The formatted string.
 */
export const formatWithSpaceThousands = (value: string | RegExp | number): string => {
  if (value instanceof RegExp) {
    return value.source;
  }
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  return num.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
};

/**
 * Gets the column name from a columns array by column ID.
 * @param columns The array of column objects.
 * @param columnID The ID of the column.
 * @returns The column name, or 'undefined' if not found.
 */
export const getColumnName = (columns: any, columnID: string) => {
  const columnName: string | undefined = columns.find((col: { id: string; }) => col.id === columnID)?.name;
  return columnName !== undefined ? columnName : 'undefined';
};

/**
 * Gets the position (index) of a column from a columns array by column ID.
 * @param columns The array of column objects.
 * @param columnID The ID of the column.
 * @returns The column position, or -1 if not found.
 */
export const getColumnPosition = (columns: any, columnID: string) => {
  const columnPosition: number | undefined = columns.find((col: { id: string; }) => col.id === columnID)?.position;
  return columnPosition !== undefined ? columnPosition : -1;
};

/**
 * Returns the current date and time as formatted strings.
 * @returns An object containing:
 *  - strDate: the date in YYYYMMDD format
 *  - strTime: the time in HHMM format
 */
export const getDateTime = () => {
    const date = new Date();
    const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');
    const strDate = joinWithPadding([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    const strTime = joinWithPadding([date.getHours(), date.getMinutes()]);

    return { strDate, strTime };
};

/**
 * Extracts the position from a variant string like 'chrX:g.123403094G>A'
 * and returns it formatted with spaces as thousands separators (e.g., '123 403 094').
 * @param data The data object containing the necessary fields.
 * @returns The formatted position string, or an empty string if not found.
 */
export const getStartPosition = (data: any): string => {
  const match = data.variant.match(/^chr\w+:g\.(\d+)[ACGT]?>[ACGT]?/i);
  if (!match) return '';
  const pos = match[1];
  return formatWithSpaceThousands(pos);
};

/**
 * Returns the URL for a given columnID and data object.
 * @param columnID The column identifier (e.g., 'dbsnp', 'gene', 'omim', etc.).
 * @param data The data object containing the necessary fields.
 * @returns The constructed URL as a string, or undefined if not applicable.
 */
export const getUrlLink = (columnID: string, data: any): string | undefined => {
  switch (columnID) {
    case 'dbsnp':
      return data.dbsnp ? `https://www.ncbi.nlm.nih.gov/snp/${data.dbsnp}` : undefined;
    case 'gene':
    case 'omim':
      return data.omimID ? `https://www.omim.org/entry/${data.omimID}` : undefined;
    case 'clinvar':
      return data.clinvarID ? `https://www.ncbi.nlm.nih.gov/clinvar/variation/${data.clinvarID}` : undefined;
    case 'cmc':
      return data.cmcID ? `https://cancer.sanger.ac.uk/cosmic/search?q=${data.cmcID}&genome=38#` : undefined;
    case 'tier':
      return data.variant
        ? `https://franklin.genoox.com/clinical-db/variant/snpTumor/${formatVariantForFranklin(data.variant, false)}`
        : undefined;
    case 'acmg_franklin':
      return data.variant
        ? `https://franklin.genoox.com/clinical-db/variant/snp/${formatVariantForFranklin(data.variant, true)}`
        : undefined;
    default:
      return undefined;
  }
};

/**
 * Converts a number in scientific notation (e.g., '6.93e-5') to its decimal string representation (e.g., '0.0000693').
 * If the input is not in scientific notation, returns it as a string.
 * @param value The value to convert (string or number).
 * @returns The decimal string representation.
 */
export const scientificToDecimal = (value: string | number): string => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return String(value);
  return num.toString().includes('e') ? num.toFixed(20).replace(/\.?0+$/, '') : String(num);
};

/**
 * Converts a string to a RegExp.
 * Optionally adds ^ and $ to match the whole string.
 * @param str The string to convert.
 * @param exact If true, adds ^ and $ to the pattern (default: false).
 * @returns The constructed RegExp.
 */
export const stringToRegExp = (str: string, exact: boolean = false): RegExp => {
  const replacedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexpStr = exact ? `^${replacedStr}$` : replacedStr;
  return new RegExp(regexpStr);
};