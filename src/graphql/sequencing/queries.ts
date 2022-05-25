import { gql } from '@apollo/client';

export const SEQUENCING_QUERY = gql`
  query SequencingsInformation($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Sequencings {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
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
          }
        }
        total
      }
    }
  }
`;
