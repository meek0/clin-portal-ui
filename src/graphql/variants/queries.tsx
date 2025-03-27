import { gql } from '@apollo/client';

const VARIANT_QUERY_BASE_FIELDS = `
  id
  hgvsg
  hash
  locus
  variant_class
  cmc{
    sample_mutated
    sample_ratio
    mutation_url
    tier
    cosmic_id
  }
  clinvar {
    clinvar_id
    clin_sig
  }
  panels
  variant_type
  max_impact_score
  rsnumber
  reference
  alternate
  chromosome
  start
  note
  flags
  interpretation
  end
  hotspot
  exomiser_max{
    variant_score
  }
  franklin_max {
    combined_score
    acmg_classification
    acmg_evidence
    link
  }
  exomiser_max {
    gene_combined_score
    acmg_classification
  }
  consequences {
    hits {
      edges {
        node {
          symbol
          #canonical
          vep_impact
          consequences
          impact_score
          hgvsc
          aa_change
          picked
          canonical
          coding_dna_change
          ensembl_gene_id
          ensembl_transcript_id
          refseq_mrna_id
          mane_select
          mane_plus
          predictions {
            fathmm_pred
            fathmm_score
            cadd_score
            cadd_phred
            dann_score
            lrt_pred
            lrt_score
            revel_score
            sift_score
            sift_pred
            polyphen2_hvar_score
            polyphen2_hvar_pred
            phyloP100way_vertebrate
          }
          exon {
            rank
            total
          }
        }
      }
    }
  }

  frequency_RQDM {
    total {
      pc
      pn
      pf
    }
    affected {
      pn
      pf
      pc
    }
    non_affected {
      pn
      pf
      pc
    }
  }

  freq_rqdm_tumor_normal {
    pc
    pn
    pf
  }

  freq_rqdm_tumor_only {
    pc
    pn
    pf
  }

  external_frequencies {
    gnomad_genomes_4 {
      af
      ac
    }
    gnomad_exomes_4 {
      af
      ac
    }
    gnomad_joint_4 {
      af
      ac
    }
    gnomad_exomes_4 {
      af
      ac
    }
    gnomad_joint_4 {
      af
      ac
    }
  }

  genes {
    hits {
      edges {
        node {
          symbol
          biotype
          omim_gene_id
          ensembl_gene_id
          spliceai {
            ds
            type
          }
          gnomad {
            loeuf
            pli
          }
          omim {
            hits {
              edges {
                node {
                  inheritance_code
                  name
                  omim_id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const VARIANT_QUERY = gql`
  query VariantInformation(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
    $searchAfter: JSON
  ) {
    Variants {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
           ${VARIANT_QUERY_BASE_FIELDS}
           donors {
              hits {
                total
                edges {
                  node {
                    all_analyses
                    aliquot_id
                    patient_id
                    organization_id
                    gender
                    is_proband
                    family_id
                    zygosity
                    transmission
                    last_update
                    ad_alt
                    ad_total
                    ad_ratio
                    affected_status
                    affected_status_code
                    qd
                    gq
                    sq
                    variant_type
                    bioinfo_analysis_code
                    filters
                    franklin_combined_score
                    mother_id
                    mother_aliquot_id
                    mother_zygosity
                    mother_affected_status
                    mother_calls
                    mother_qd
                    mother_ad_alt
                    mother_ad_total
                    mother_ad_ratio
                    mother_gq
                    father_id
                    father_aliquot_id
                    father_zygosity
                    father_affected_status
                    father_calls
                    father_qd
                    father_ad_alt
                    father_ad_total
                    father_ad_ratio
                    father_gq
                    parental_origin
                    is_hc
                    is_possibly_hc
                    service_request_id
                    analysis_service_request_id
                    hc_complement {
                      hits {
                        edges {
                          node {
                            symbol
                            locus
                          }
                        }
                      }
                    }
                    is_possibly_hc
                    possibly_hc_complement {
                      hits {
                        edges {
                          node {
                            symbol
                            count
                          }
                        }
                      }
                    }
                    exomiser {
                      gene_combined_score
                      acmg_classification
                      acmg_evidence
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

export const VARIANT_QUERY_NO_DONORS = gql`
  query VariantInformation(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
    $searchAfter: JSON
  ) {
    Variants {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            ${VARIANT_QUERY_BASE_FIELDS}
          }
        }
      }
    }
  }
`;

export const GET_VARIANT_COUNT = gql`
  query getVariantCount($sqon: JSON) {
    Variants {
      hits(filters: $sqon, first: 0) {
        total
      }
    }
  }
`;

export const TAB_FREQUENCIES_QUERY = gql`
  query GetFrequenciesTabVariant($sqon: JSON) {
    Variants {
      hits(filters: $sqon) {
        edges {
          node {
            locus
            frequencies_by_analysis {
              hits {
                edges {
                  node {
                    analysis_code
                    affected {
                      ac
                      af
                      an
                      pn
                      pf
                      pc
                      hom
                    }
                    non_affected {
                      ac
                      af
                      an
                      pn
                      pf
                      pc
                      hom
                    }
                    total {
                      ac
                      af
                      an
                      pn
                      pf
                      pc
                      hom
                    }
                  }
                }
              }
            }
            external_frequencies {
              topmed_bravo {
                ac
                af
                an
                hom
                het
              }
              thousand_genomes {
                ac
                af
                an
              }
              gnomad_genomes_4 {
                ac
                af
                an
                hom
              }
              gnomad_exomes_4 {
                ac
                af
                an
                hom
              }
              gnomad_joint_4 {
                ac
                af
                an
                hom
              }
            }
            frequency_RQDM {
              affected {
                ac
                af
                an
                pn
                pf
                pc
                hom
              }
              non_affected {
                ac
                af
                an
                pn
                pf
                pc
                hom
              }
              total {
                ac
                af
                an
                pn
                pf
                pc
                hom
              }
            }
          }
        }
      }
    }
  }
`;

export const TAB_SUMMARY_QUERY = gql`
  query GetSummaryTabVariant($sqon: JSON) {
    Variants {
      hits(filters: $sqon) {
        total
        edges {
          node {
            alternate
            chromosome
            hgvsg
            hash
            locus
            clinvar {
              clinvar_id
              clin_sig
            }
            rsnumber
            reference
            start
            variant_type
            max_impact_score
            variant_class
            assembly_version
            last_annotation_update
            frequency_RQDM {
              total {
                ac
                af
                an
                hom
                pn
                pc
                pf
              }
            }
            consequences {
              hits {
                edges {
                  node {
                    biotype
                    symbol
                    vep_impact
                    symbol
                    consequences
                    ensembl_gene_id
                    coding_dna_change
                    aa_change
                    hgvsc
                    hgvsp
                    strand
                    canonical
                    mane_select
                    mane_plus
                    conservations {
                      phylo_p17way_primate_score
                    }
                    refseq_mrna_id
                    ensembl_transcript_id
                    predictions {
                      fathmm_pred
                      fathmm_score
                      cadd_score
                      cadd_phred
                      dann_score
                      lrt_pred
                      lrt_score
                      revel_score
                      sift_score
                      sift_pred
                      polyphen2_hvar_score
                      polyphen2_hvar_pred
                      phyloP100way_vertebrate
                    }
                    impact_score
                  }
                }
              }
            }
            genes {
              hits {
                edges {
                  node {
                    omim_gene_id
                    symbol
                    location
                    biotype
                    spliceai {
                      ds
                      type
                    }
                    gnomad {
                      pli
                      loeuf
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

export const TAB_CLINICAL_QUERY = gql`
  query GetClinicalTabVariant($sqon: JSON) {
    Variants {
      hits(filters: $sqon) {
        edges {
          node {
            clinvar {
              clin_sig
              clinvar_id
              conditions
              inheritance
            }
            genes {
              hits {
                edges {
                  node {
                    symbol
                    omim_gene_id
                    spliceai {
                      ds
                    }
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

export const TAB_PATIENT_QUERY = gql`
  query GetPatientTabVariant($sqon: JSON, $pageSize: Int, $offset: Int, $sort: [Sort]) {
    Variants {
      hits(filters: $sqon, first: $pageSize, offset: $offset, sort: $sort) {
        edges {
          node {
            donors {
              hits {
                total
                edges {
                  node {
                    aliquot_id
                    patient_id
                    organization_id
                    analysis_code
                    gender
                    filters
                    is_proband
                    family_id
                    zygosity
                    last_update
                    ad_alt
                    ad_total
                    ad_ratio
                    affected_status
                    affected_status_code
                    qd
                    gq
                    sq
                    bioinfo_analysis_code
                    service_request_id
                    analysis_service_request_id
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

export const VARIANT_SEARCH_QUERY = gql`
  query VariantStats {
    Variants {
      hits {
        edges {
          node {
            locus
            rsnumber
          }
        }
      }
    }
  }
`;

export const VARIANT_STATS_QUERY = gql`
  query VariantStats {
    variantStats {
      hits {
        edges {
          node {
            distinctVariantsCount
            occurrencesCount
            participantsCount
            studiesCount
          }
        }
      }
    }
  }
`;
