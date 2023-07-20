import { wrapSqonWithDonorIdAndSrId } from '../helper';

describe('wrapSqonWithDonorIdAndSrId', () => {
  test('Should wrap patientId', () => {
    const resolvedSqon = {};

    const expected = {
      content: [
        {
          content: [{ content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' }],
          op: 'and',
        },
        {},
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, 'foo', null)).toEqual(expected);
  });
  test('Should wrap prescriptionId', () => {
    const resolvedSqon = {};

    const expected = {
      content: [
        {
          content: [{ content: { field: 'donors.service_request_id', value: ['bar'] }, op: 'in' }],
          op: 'and',
        },
        {},
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, null, 'bar')).toEqual(expected);
  });
  test('Should wrap both patient and prescription', () => {
    const resolvedSqon = {};

    const expected = {
      content: [
        {
          content: [
            { content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' },
            { content: { field: 'donors.service_request_id', value: ['bar'] }, op: 'in' },
          ],
          op: 'and',
        },
        {},
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, 'foo', 'bar')).toEqual(expected);
  });
});
