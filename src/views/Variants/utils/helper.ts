import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

export const wrapSqonWithDonorId = (resolvedSqon: ISqonGroupFilter, patientId: string) => {
  if (patientId) {
    return {
      content: [
        {
          content: { field: 'donors.patient_id', value: [patientId] },
          op: 'in',
        },
        { ...resolvedSqon },
      ],
      op: 'and',
      pivot: 'donors',
    };
  }

  return resolvedSqon;
};
