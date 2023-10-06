import { wrapSqonWithPatientIdAndRequestId } from '../helper';

describe('wrapSqonWithPatientIdAndRequestId', () => {
  test('Should wrap patientId', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        { content: [{ content: { field: 'patient_id', value: ['foo'] }, op: 'in' }], op: 'and' },
        { content: [], op: 'and', pivot: 'donors' },
      ],
      op: 'and',
    };
    expect(wrapSqonWithPatientIdAndRequestId(resolvedSqon, 'foo', null)).toEqual(expected);
  });
  test('Should wrap prescriptionId', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        {
          content: [
            { content: { field: 'analysis_service_request_id', value: ['bar'] }, op: 'in' },
          ],
          op: 'and',
        },
        { content: [], op: 'and', pivot: 'donors' },
      ],
      op: 'and',
    };
    expect(wrapSqonWithPatientIdAndRequestId(resolvedSqon, null, 'bar')).toEqual(expected);
  });
  test('Should wrap patientId and prescriptionId', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        {
          content: [
            { content: { field: 'patient_id', value: ['foo'] }, op: 'in' },
            { content: { field: 'analysis_service_request_id', value: ['bar'] }, op: 'in' },
          ],
          op: 'and',
        },
        { content: [], op: 'and', pivot: 'donors' },
      ],
      op: 'and',
    };
    expect(wrapSqonWithPatientIdAndRequestId(resolvedSqon, 'foo', 'bar')).toEqual(expected);
  });
});
