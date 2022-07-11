import { gql } from '@apollo/client';

export const GET_VARIANT_COUNT = gql`
  query CnvCount($sqon: JSON) {
    cnv {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const VARIANT_QUERY = gql`
  query Cnv($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    cnv {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            patient_id
            chromosome
            start
            end
            name
            svlen
            cn
            number_genes
            filters
            sm
            bc
            pe
          }
        }
      }
    }
  }
`;
