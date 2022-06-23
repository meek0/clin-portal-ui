import { gql } from '@apollo/client';

export const CHECK_GENE_MATCH_QUERY = gql`
  query CheckGenesMatch($sqon: JSON, $pageSize: Int, $offset: Int) {
    Genes {
      hits(filters: $sqon, first: $pageSize, offset: $offset) {
        edges {
          node {
            symbol
            omim_gene_id
            alias
            ensembl_gene_id
          }
        }
      }
    }
  }
`;
