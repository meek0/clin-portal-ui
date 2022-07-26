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
        total
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
            genes {
              hits {
                edges {
                  node {
                    overlap_bases
                    overlap_cnv_ratio
                    overlap_exons
                    overlap_gene_ratio
                    symbol
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
