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
            genome_build
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
            note
            qual
            start
            end
            name
            reflen
            cn
            number_genes
            filters
            snv_count
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
            cluster {
              external_frequencies {
                gnomad_exomes_4 {
                  sf
                  sc
                }
              }
              frequency_RQDM {
                germ {
                  total {
                    pc
                    pf
                  }
                  affected {
                    pc
                    pf
                  }
                  non_affected {
                    pc
                    pf
                  }
                }
                som {
                  pc
                  pf
                }
              }
            }
            exomiser {
              variant_score_category
              variant_score
              acmg_classification
            }
            genes {
              hits {
                edges {
                  node {
                    gene_length
                    omim_gene_id
                    overlap_bases
                    overlap_cnv_ratio
                    overlap_exons
                    overlap_gene_ratio
                    location
                    symbol
                    panels
                    omim {
                      hits {
                        edges {
                          node {
                            omim_id
                            name
                            inheritance
                            inheritance_code
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
