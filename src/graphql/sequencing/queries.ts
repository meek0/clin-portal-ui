import { gql } from '@apollo/client';

export const SEQUENCING_QUERY = gql`
  query SequencingsInformation(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
    $searchAfter: JSON
  ) {
    Sequencings {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        edges {
          searchAfter
          node {
            id
            request_id
            patient_id
            patient_mrn
            prescription_id
            ep
            created_on
            timestamp
            requester
            prenatal
            ldm
            analysis_code
            status
            sample
            tasks
            prescription_status
            patient_relationship
            patient_disease_status
            task_runname
          }
        }
        total
      }
    }
  }
`;
