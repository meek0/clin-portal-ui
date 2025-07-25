import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';

const panelsDictionaries = [
  'MMG',
  'DYSM',
  'RHAB',
  'MYAC',
  'MYOC',
  'HYPM',
  'MITN',
  'RGDI',
  'RGDI+',
  'POLYM',
  'TUPED',
  'TUHEM',
  'SSOLID',
  'SHEMA',
  'SCID',
  'THBP',
  'IEI',
  'HLH',
  'VEOIBD',
  'EPILEP',
  'RGDIEP',
  ArrangerValues.missing,
];

export const dictionaries: Record<string, string[]> = {
  // Patients:
  'donors.analysis_code': [
    'MMG',
    'DYSM',
    'RHAB',
    'MYAC',
    'MYOC',
    'HYPM',
    'MITN',
    'RGDI',
    'POLYM',
    'TUPED',
    'TUHEM',
    'SCID',
    'EXTUM',
    'GENOR',
    ArrangerValues.missing,
  ],
  'donors.affected_status_code': ['affected', 'not_affected', 'unknown'],
  'donors.gender': ['Female', 'Male', 'other', 'unknown'],
  // Variants
  type: ['GAIN', 'LOSS', 'GAINLOH', 'CNLOH', ArrangerValues.missing],
  variant_class: [
    'insertion',
    'deletion',
    'SNV',
    'indel',
    'substitution',
    'sequence_alteration',
    ArrangerValues.missing,
  ],
  'consequences.consequences': [
    'transcript_ablation',
    'splice_acceptor_variant',
    'splice_donor_variant',
    'stop_gained',
    'frameshift_variant',
    'stop_lost',
    'start_lost',
    'transcript_amplification',
    'inframe_insertion',
    'inframe_deletion',
    'missense_variant',
    'protein_altering_variant',
    'splice_region_variant',
    'splice_donor_5th_base_variant',
    'splice_donor_region_variant',
    'splice_polypyrimidine_tract_variant',
    'incomplete_terminal_codon_variant',
    'start_retained_variant',
    'stop_retained_variant',
    'synonymous_variant',
    'coding_sequence_variant',
    'mature_miRNA_variant',
    '5_prime_UTR_variant',
    '3_prime_UTR_variant',
    'non_coding_transcript_exon_variant',
    'intron_variant',
    'NMD_transcript_variant',
    'non_coding_transcript_variant',
    'upstream_gene_variant',
    'downstream_gene_variant',
    'TFBS_ablation',
    'TFBS_amplification',
    'TF_binding_site_variant',
    'regulatory_region_ablation',
    'regulatory_region_amplification',
    'feature_elongation',
    'regulatory_region_variant',
    'feature_truncation',
    'intergenic_variant',
  ],
  variant_external_reference: [
    'DBSNP',
    'Clinvar',
    'PubMed',
    'Cosmic',
    'Franklin',
    'gnomAD',
    ArrangerValues.missing,
  ],
  chromosome: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    'X',
    'Y',
    ArrangerValues.missing,
  ],
  // Genes
  'consequences.biotype': [
    'IG_C_gene',
    'IG_D_gene',
    'IG_J_gene',
    'IG_LV_gene',
    'IG_V_gene',
    'TR_C_gene',
    'TR_J_gene',
    'TR_V_gene',
    'TR_D_gene',
    'IG_pseudogene',
    'IG_C_pseudogene',
    'IG_J_pseudogene',
    'IG_V_pseudogene',
    'TR_V_pseudogene',
    'TR_J_pseudogene',
    'Mt_rRNA',
    'Mt_tRNA',
    'miRNA',
    'misc_RNA',
    'rRNA',
    'scRNA',
    'snRNA',
    'snoRNA',
    'ribozyme',
    'sRNA',
    'scaRNA',
    'Non-coding',
    'lncRNA',
    'Mt_tRNA_pseudogene',
    'tRNA_pseudogene',
    'snoRNA_pseudogene',
    'snRNA_pseudogene',
    'scRNA_pseudogene',
    'rRNA_pseudogene',
    'misc_RNA_pseudogene',
    'miRNA_pseudogene',
    'TEC',
    'nonsense_mediated_decay',
    'non_stop_decay',
    'retained_intron',
    'protein_coding',
    'protein_coding_LoF',
    'protein_coding_CDS_not_defined',
    'processed_transcript',
    'non_coding',
    'ambiguous_orf',
    'sense_intronic',
    'sense_overlapping',
    'antisense_RNA',
    'known_ncrna',
    'pseudogene',
    'processed_pseudogene',
    'polymorphic_pseudogene',
    'retrotransposed',
    'transcribed_processed_pseudogene',
    'transcribed_unprocessed_pseudogene',
    'transcribed_unitary_pseudogene',
    'translated_processed_pseudogene',
    'translated_unprocessed_pseudogene',
    'unitary_pseudogene',
    'unprocessed_pseudogene',
    'artifact',
    'lincRNA',
    'macro_lncRNA',
    '3prime_overlapping_ncRNA',
    'disrupted_domain',
    'vault_RNA',
    'bidirectional_promoter_lncRNA',
    ArrangerValues.missing,
  ],
  gene_external_reference: [
    'OMIM',
    'HPO',
    'Orphanet',
    'SpliceAI',
    'Cosmic',
    'gnomAD',
    'DDD',
    ArrangerValues.missing,
  ],
  'genes.omim.inheritance_code': [
    '?AD',
    '?AR',
    '?DD',
    '?DR',
    '?IC',
    '?Mi',
    '?Mu',
    '?SMo',
    '?Smu',
    '?XL',
    '?XLD',
    '?XLR',
    '?YL',
    'AD',
    'AR',
    'DD',
    'DR',
    'IC',
    'Mi',
    'Mu',
    'NRT',
    'SMo',
    'Smu',
    'XL',
    'XLD',
    'XLR',
    'YL',
    ArrangerValues.missing,
  ],
  'genes.panels': panelsDictionaries,
  panels: panelsDictionaries,
  // Pathogenicity
  'clinvar.clin_sig': [
    'Benign',
    'Likely_benign',
    'Uncertain_significance',
    'Conflicting_classifications_of_pathogenicity',
    'Conflicting_interpretations_of_pathogenicity',
    'Pathogenic',
    'not_provided',
    'drug_response',
    'risk_factor',
    'Likely_pathogenic',
    'association',
    'other',
    'Affects',
    'no_classification_for_the_single_variant',
    'protective',
    'confers_sensitivity',
    'Uncertain_risk_allele',
    'association_not_found',
    'Likely_risk_allele',
    'low_penetrance',
    ArrangerValues.missing,
  ],
  'donors.exomiser.acmg_classification': [
    'PATHOGENIC',
    'LIKELY_PATHOGENIC',
    'UNCERTAIN_SIGNIFICANCE',
    'LIKELY_BENIGN',
    'BENIGN',
    ArrangerValues.missing,
  ],
  'donors.all_analyses': ['TO', 'TN', ArrangerValues.missing],

  'consequences.vep_impact': ['HIGH', 'MODERATE', 'LOW', 'MODIFIER', ArrangerValues.missing],
  'consequences.predictions.fathmm_pred': ['D', 'T', ArrangerValues.missing],
  'consequences.predictions.lrt_pred': ['D', 'N', 'U', ArrangerValues.missing],
  'consequences.predictions.polyphen2_hvar_pred': ['B', 'D', 'P', ArrangerValues.missing],
  'consequences.predictions.sift_pred': ['D', 'T', ArrangerValues.missing],
  'cmc.tier': ['1', '2', '3', 'Other', ArrangerValues.missing],
  'franklin_max.acmg_classification': [
    'PATHOGENIC',
    'LIKELY_PATHOGENIC',
    'UNCERTAIN_SIGNIFICANCE',
    'LIKELY_BENIGN',
    'BENIGN',
    'POSSIBLY_PATHOGENIC_MODERATE',
    'POSSIBLY_PATHOGENIC_BENIGN',
    'POSSIBLY_PATHOGENIC_LOW',
    'POSSIBLY_BENIGN',
    ArrangerValues.missing,
  ],
  'franklin_max.acmg_evidence': [
    'PVS1',
    'PS1',
    'PS2',
    'PS3',
    'PS4',
    'PM1',
    'PM2',
    'PM3',
    'PM4',
    'PM5',
    'PP1',
    'PP2',
    'PP3',
    'PP4',
    'PP5',
    'BA1',
    'BS1',
    'BS2',
    'BS3',
    'BS4',
    'BP1',
    'BP2',
    'BP3',
    'BP4',
    'BP6',
    ArrangerValues.missing,
  ],
  'exomiser_max.acmg_evidence': [
    'PVS1',
    'PS2',
    'PM2',
    'PM3',
    'PM4',
    'PP3',
    'PP4',
    'PP5',
    'BA1',
    'BS4',
    'BP2',
    'BP4',
    'BP6',
    ArrangerValues.missing,
  ],
  'exomiser_max.acmg_classification': [
    'PATHOGENIC',
    'LIKELY_PATHOGENIC',
    'UNCERTAIN_SIGNIFICANCE',
    'LIKELY_BENIGN',
    'BENIGN',
    ArrangerValues.missing,
  ],
  hotspot: ['0', '1', ArrangerValues.missing],
  // Occurrence
  'donors.zygosity': ['HOM', 'HEM', 'HET'],
  'donors.mother_zygosity': ['HOM', 'HEM', 'HET', 'WT', 'UNK'],
  'donors.father_zygosity': ['HOM', 'HEM', 'HET', 'WT', 'UNK'],
  'donors.parental_origin': [
    'denovo',
    'possible_denovo',
    'both',
    'mother',
    'father',
    'possible_father',
    'possible_mother',
    'ambiguous',
    'unknown',
    ArrangerValues.missing,
  ],
  'donors.transmission': [
    'autosomal_dominant_de_novo',
    'autosomal_dominant',
    'autosomal_recessive',
    'x_linked_dominant_de_novo',
    'x_linked_recessive_de_novo',
    'x_linked_dominant',
    'x_linked_recessive',
    'non_carrier_proband',
    'unknown_parents_genotype',
    'unknown_proband_genotype',
    'unknown_father_genotype',
    'unknown_mother_genotype',
    ArrangerValues.missing,
  ],
  'donors.is_hc': ['0', '1'],
  'donors.is_possibly_hc': ['0', '1'],
  'donors.filters': [
    'alt_allele_in_normal',
    'artifact_in_normal',
    'base_quality',
    'clustered_events',
    'DRAGENIndelHardQUAL',
    'DRAGENSnpHardQUAL',
    'filtered_reads',
    'fragment_length',
    'germline_risk',
    'lod_fstar',
    'long_indel',
    'low_af',
    'low_depth',
    'low_tlen',
    'low_frac_info_reads',
    'low_normal_depth',
    'mapping_quality',
    'multiallelic',
    'no_reliable_supporting_read',
    'noisy_normal',
    'non_homref_normal',
    'panel_of_normals',
    'PASS',
    'PloidyConflict',
    'read_position',
    'RMxNRepeatRegion',
    'str_contraction',
    'strand_artifact',
    'systematic_noise',
    'too_few_supporting_reads',
    'weak_evidence',
    ArrangerValues.missing,
  ],
  filters: [
    'PASS',
    'cnvQual',
    'cnvCopyRatio',
    'LoDFail',
    'binCount',
    'segmentMean',
    ArrangerValues.missing,
  ],
  transmission: [
    'autosomal_dominant_de_novo',
    'autosomal_dominant',
    'autosomal_recessive',
    'x_linked_dominant_de_novo',
    'x_linked_recessive_de_novo',
    'x_linked_dominant',
    'x_linked_recessive',
    'non_carrier_proband',
    'unknown_parents_genotype',
    'unknown_proband_genotype',
    'unknown_father_genotype',
    'unknown_mother_genotype',
    ArrangerValues.missing,
  ],
  parental_origin: [
    'denovo',
    'possible_denovo',
    'both',
    'mother',
    'father',
    'possible_father',
    'possible_mother',
    'ambiguous',
    'unknown',
    ArrangerValues.missing,
  ],
};
