import { GqlResults, hydrateResults } from 'graphql/models';
import { PatientFileResults, PatientResult } from 'graphql/patients/models/Patient';
import { QueryVariable } from 'graphql/queries';
import { useLazyResultQuery, useLazyResultQueryOnLoadOnly } from 'graphql/utils/query';
import { IValueContent, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { PATIENTS_QUERY, PATIENT_ENTITY_QUERY, PATIENT_FILES_QUERY } from './queries';
import { ApolloError } from '@apollo/client';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';

export const mappedFilters = (sqonFilters: ISyntheticSqon): ISyntheticSqon => {
  const mappedPrescriptionsToPatients = {
    ...sqonFilters,
  };

  const newContent = mappedPrescriptionsToPatients.content.map((c) => {
    if (typeof c !== 'object') {
      return c;
    }

    const cc = c.content as IValueContent;
    return {
      ...c,
      content: {
        ...cc,
        field: `requests.${cc.field}`,
      },
    };
  });

  mappedPrescriptionsToPatients.content = newContent;
  return mappedPrescriptionsToPatients;
};

export const usePatientEntity = (
  id: string,
): {
  patient: PatientResult | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(PATIENT_ENTITY_QUERY, {
    skip: !id,
    variables: {
      sqon: {
        content: [
          {
            content: {
              field: 'cid',
              value: id,
            },
            op: TermOperators.in,
          },
        ],
        op: BooleanOperators.and,
      },
    },
  });

  return {
    patient: data?.Patients?.hits?.edges[0]?.node,
    loading,
    error,
  };
};
export const usePatients = (variables: QueryVariable): GqlResults<PatientResult> => {
  const { loading, result } = useLazyResultQuery<any>(PATIENTS_QUERY, {
    variables: variables,
  });
  const patients = result?.Patients;

  return {
    aggregations: patients?.aggregations,
    data: hydrateResults(patients?.hits?.edges || []),
    loading,
    total: patients?.hits.total,
  };
};

export const usePatientFilesData = (
  patientId: string,
  skip?: boolean,
): {
  loading: boolean;
  results: PatientFileResults;
  error: any;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(
    PATIENT_FILES_QUERY(patientId),
    {
      variables: {
        patientId: patientId,
      },
      skip: skip,
    },
  );

  return {
    loading,
    results: data?.Patient,
    error,
  };
};
