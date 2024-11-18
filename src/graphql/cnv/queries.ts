import { gql } from '@apollo/client';

export const GET_VARIANT_COUNT = gql`
  query CnvCount($sqon: JSON) {
    cnv {
      hits(filters: $sqon, first: 0) {
        total
      }
    }
  }
`;

export const VARIANT_QUERY = gql`
  query Cnv($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {
    cnv {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            service_request_id
            analysis_service_request_id
            id
            variant_type
            bioinfo_analysis_code
            hash
            aliquot_id
            patient_id
            chromosome
            sort_chromosome
            type
            flags
            qual
            start
            end
            name
            reflen
            cn
            number_genes
            filters
            calls
            sm
            bc
            pe
            father_id
            mother_id
            father_aliquot_id
            mother_aliquot_id
            parental_origin
            transmission
            is_proband
            gender
            genes {
              hits {
                edges {
                  node {
                    gene_length
                    overlap_bases
                    overlap_cnv_ratio
                    overlap_exons
                    overlap_gene_ratio
                    symbol
                    panels
                    omim {
                      hits {
                        edges {
                          node {
                            omim_id
                            name
                            inheritance
                          }
                        }
                      }
                    }
                    orphanet {
                      hits {
                        edges {
                          node {
                            panel
                            inheritance
                            disorder_id
                          }
                        }
                      }
                    }
                    cosmic {
                      hits {
                        edges {
                          node {
                            tumour_types_germline
                          }
                        }
                      }
                    }
                    hpo {
                      hits {
                        edges {
                          node {
                            hpo_term_label
                            hpo_term_id
                          }
                        }
                      }
                    }
                    ddd {
                      hits {
                        edges {
                          node {
                            disease_name
                          }
                        }
                      }
                    }
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
