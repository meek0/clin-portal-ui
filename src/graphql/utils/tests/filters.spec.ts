import * as formattingMod from '@ferlab/ui/core/data/arranger/formatting';

import { getExtraFilterDictionnairy, keyEnhanceBooleanOnlyExcept } from '../Filters';

describe('Filters', () => {
  describe('keyEnhanceBooleanOnlyExcept', () => {
    test('Should only set True or False for boolean content', () => {
      expect(keyEnhanceBooleanOnlyExcept('', 'true', 'boolean')).toEqual('True');
      expect(keyEnhanceBooleanOnlyExcept('', 'false', 'boolean')).toEqual('False');
    });

    test('Should not interpret 0 or 1 value as boolean', () => {
      expect(keyEnhanceBooleanOnlyExcept('', '1')).toEqual('1');
      expect(keyEnhanceBooleanOnlyExcept('', '0')).toEqual('0');
    });

    test('should not call keyEnhance when field is chromosome', () => {
      const spy = jest.spyOn(formattingMod, 'keyEnhance').mockReturnValue('1');
      expect(keyEnhanceBooleanOnlyExcept('chromosome', '1')).toEqual('1');
      expect(spy).not.toHaveBeenCalled();
    });

    test('should call keyEnhance when field anything but chromosome', () => {
      const spy = jest.spyOn(formattingMod, 'keyEnhance').mockReturnValue('1');
      expect(keyEnhanceBooleanOnlyExcept('somethingelse', '1')).toEqual('1');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('extraFilterDictionnairy', () => {
    test('should return extraFilterDictionnairy if no value', () => {
      const extendedMapping = {
        field: 'variant_class',
        displayName: 'Variant Class',
        active: false,
        isArray: false,
        type: 'keyword',
      };
      const aggregation = {
        __typename: 'Aggregations',
        buckets: [],
      };
      const expectValue = [
        'insertion',
        'deletion',
        'SNV',
        'indel',
        'substitution',
        'sequence_alteration',
        '__missing__',
      ];
      expect(getExtraFilterDictionnairy(extendedMapping, aggregation)).toEqual(expectValue);
    });
    test('should return extraFilterDictionnairy if missing value', () => {
      const extendedMapping = {
        field: 'variant_class',
        displayName: 'Variant Class',
        active: false,
        isArray: false,
        type: 'keyword',
      };
      const aggregation = {
        __typename: 'Aggregations',
        buckets: [
          {
            __typename: 'Bucket',
            key: 'SNV',
            key_as_string: null,
            doc_count: 10,
          },
          {
            __typename: 'Bucket',
            key: 'deletion',
            key_as_string: null,
            doc_count: 12,
          },
          {
            __typename: 'Bucket',
            key: 'insertion',
            key_as_string: null,
            doc_count: 14,
          },
        ],
      };
      const expectValue = [
        'insertion',
        'deletion',
        'SNV',
        'indel',
        'substitution',
        'sequence_alteration',
        '__missing__',
      ];
      expect(getExtraFilterDictionnairy(extendedMapping, aggregation)).toEqual(expectValue);
    });
  });
  test('should return extraFilterDictionnairy if only _missing_ value', () => {
    const extendedMapping = {
      field: 'variant_class',
      displayName: 'Variant Class',
      active: false,
      isArray: false,
      type: 'keyword',
    };
    const aggregation = {
      __typename: 'Aggregations',
      buckets: [
        {
          __typename: 'Bucket',
          key: '__missing__',
          key_as_string: null,
          doc_count: 1,
        },
      ],
    };
    const expectValue = [
      'insertion',
      'deletion',
      'SNV',
      'indel',
      'substitution',
      'sequence_alteration',
      '__missing__',
    ];
    expect(getExtraFilterDictionnairy(extendedMapping, aggregation)).toEqual(expectValue);
  });
});
