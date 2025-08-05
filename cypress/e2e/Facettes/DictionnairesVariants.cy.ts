/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Dictionnaire', () => {
  it('Patient - Analyse', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM)',
                         'Congenital Myopathies (MYOC)',
                         'Global Developmental Delay / Intellectual Disability (Trio) (RGDI',
                         'Hematological Malignancies Predisposition (TUHEM)',
                         'Congenital Myasthenia (MYAC)',
                         'Global Muscular Diseases (MMG)',
                         'Muscular Dystrophies (DYSM)',
                         'Nuclear Mitochondriopathies (MITN)',
                         'Pediatric Cancer Predisposition (TUPED)',
                         'Polymalformation postnatal context (POLYM)',
                         'Rhabdomyolysis (RHAB)',
                         'Tumoral Analysis (EXTUM)',
                         'Severe Combined Immune Deficiency (SCID)',
                         'Normal Genome (GENOR)',
                         'Amyotrophic lateral sclerosis (SLA)',
                         'Autoinflammatory diseases (MAI)',
                         'Congenital neutropenia (NPC)',
                         'Epilepsy without intellectual disability (EPIL)',
                         'Fetal anomalies (FEAN)',
                         'Hearing loss (SURD)',
                         'emophagocytic lymphohistiocytosis (HLH)',
                         'Hyper-IgE syndrome (SHIGE)',
                         'Hypogammaglobulinemia and primary immune dysregulation (HDIP)',
                         'Inborn errors of immunity (EIDI)',
                         'Inherited complement errors (EIDC)',
                         'Inherited errors of intrinsic immunity (EIII)',
                         'Leukemia (Somatic) (SHEMA)',
                         'Lymphohistiocytic hemophagocytosis and chronic active Epstein-Barr virus infection (HLEB)',
                         'Mendelian Susceptibility to Mycobacterial Diseases (MSMD)',
                         'Retinopathy (RETINO)',
                         'Soft Tissue and Bone Sarcoma (STMO)',
                         'Superoxide production defect (DPSO)',
                         'Tumoral Transcriptome (TRATU)',
                         'Very Early Onset Intestinal Bowl Disease (VEOIB)',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Patient', 'Analyse', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Patient', 'Analyse', dictionnary);
  });

  it('Patient - Statut clinique', () => {
    const dictionnary = ['Atteint',
                          'Non atteint',
                          'Inconnu'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Patient', 'Statut clinique', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Patient', 'Statut clinique', dictionnary);
  });

  it('Patient - Sexe', () => {
    const dictionnary = ['Féminin',
                         'Masculin',
                         'Autre',
                         'Indéterminé'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Patient', 'Sexe', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Patient', 'Sexe', dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['Insertion',
                         'Délétion',
                         'SNV',
                         'Indel',
                         'Substitution',
                         'Séquence Altération',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Type de variant', dictionnary, true);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Type de variant', dictionnary);
  });

  it('Variant - Conséquences', () => {
    const dictionnary = ['Transcript Ablation',
                          'Splice Acceptor',
                          'Splice Donor',
                          'Stop Gained',
                          'Frameshift',
                          'Stop Lost',
                          'Start Lost',
                          'Transcript Amplification',
                          'Inframe Insertion',
                          'Inframe Deletion',
                          'Missense',
                          'Protein Altering',
                          'Splice Region',
                          'Splice Donor 5th Base',
                          'Splice Donor Region',
                          'Splice Polypyrimidine Tract',
                          'Incomplete Terminal Codon',
                          'Start Retained',
                          'Stop Retained',
                          'Synonymous',
                          'Coding Sequence',
                          'Mature MiRNA',
                          '5 Prime UTR',
                          '3 Prime UTR',
                          'Non Coding Transcript Exon',
                          'Intron',
                          'NMD Transcript',
                          'Non Coding Transcript',
                          'Upstream Gene',
                          'Downstream Gene',
                          'TFBS Ablation',
                          'TFBS Amplification',
                          'TF Binding Site',
                          'Regulatory Region Ablation',
                          'Regulatory Region Amplification',
                          'Feature Elongation',
                          'Regulatory Region',
                          'Feature Truncation',
                          'Intergenic'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Conséquences', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Conséquences', dictionnary);
  });

  it('Variant - Référence externe', () => {
    const dictionnary = ['DBSNP',
                         'Clinvar',
                         'PubMed',
                         'Cosmic',
                         'Franklin',
                         'GnomAD',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Référence externe', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Référence externe', dictionnary);
  });

  it('Variant - Chromosome', () => {
    const dictionnary = [/^1$/,
                         /^2$/,
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
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Chromosome', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Chromosome', dictionnary);
  });

  it('Variant - Zygosité', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Zygosité', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Zygosité', dictionnary);
  });

  it('Variant - Transmission', () => {
    const dictionnary = ['Autosomal Dominant De Novo',
                          'Autosomal Dominant',
                          'Autosomal Recessive',
                          'X Linked Dominant De Novo',
                          'X Linked Recessive De Novo',
                          'X Linked Dominant',
                          'X Linked Recessive',
                          'Non Carrier Proband',
                          'Unknown Parents Genotype',
                          'Unknown Father Genotype',
                          'Unknown Mother Genotype',
                          'Unknown Proband Genotype',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Transmission', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Transmission', dictionnary);
  });

  it('Variant - Hét. composé', () => {
    const dictionnary = ['False',
                         'True'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Variant', 'Hét. composé', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Variant', 'Hét. composé', dictionnary);
  });

  it('Gène - Type de gène', () => {
    const dictionnary = ['IG C Gene',
                          'IG D Gene',
                          'IG J Gene',
                          'IG LV Gene',
                          'IG V Gene',
                          'TR C Gene',
                          'TR J Gene',
                          'TR V Gene',
                          'TR D Gene',
                          'IG Pseudogene',
                          'IG C Pseudogene',
                          'IG J Pseudogene',
                          'IG V Pseudogene',
                          'TR V Pseudogene',
                          'TR J Pseudogene',
                          'Mt RRNA',
                          'Mt TRNA',
                          'MiRNA',
                          'Misc RNA',
                          'RRNA',
                          'ScRNA',
                          'SnRNA',
                          'SnoRNA',
                          'Ribozyme',
                          'SRNA',
                          'ScaRNA',
                          'Non Coding',
                          'LncRNA',
                          'Mt TRNA Pseudogene',
                          'TRNA Pseudogene',
                          'SnoRNA Pseudogene',
                          'SnRNA Pseudogene',
                          'ScRNA Pseudogene',
                          'RRNA Pseudogene',
                          'Misc RNA Pseudogene',
                          'MiRNA Pseudogene',
                          'TEC',
                          'Nonsense Mediated Decay',
                          'Non Stop Decay',
                          'Retained Intron',
                          'Protein Coding',
                          'Protein Coding LoF',
                          'Protein Coding CDS Not Defined',
                          'Processed Transcript',
                          'Non Coding',
                          'Ambiguous Orf',
                          'Sense Intronic',
                          'Sense Overlapping',
                          'Antisense RNA',
                          'Known Ncrna',
                          'Pseudogene',
                          'Processed Pseudogene',
                          'Polymorphic Pseudogene',
                          'Retrotransposed',
                          'Transcribed Processed Pseudogene',
                          'Transcribed Unprocessed Pseudogene',
                          'Transcribed Unitary Pseudogene',
                          'Translated Processed Pseudogene',
                          'Translated Unprocessed Pseudogene',
                          'Unitary Pseudogene',
                          'Unprocessed Pseudogene',
                          'Artifact',
                          'LincRNA',
                          'Macro LncRNA',
                          '3prime Overlapping NcRNA',
                          'Disrupted Domain',
                          'Vault RNA',
                          'Bidirectional Promoter LncRNA',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Gène', 'Type de gène', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Gène', 'Type de gène', dictionnary);
  });

  it('Gène - Référence externe', () => {
    const dictionnary = ['OMIM',
                         'HPO',
                         'Orphanet',
                         'SpliceAI',
                         'Cosmic',
                         'gnomAD',
                         'DDD',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Gène', 'Référence externe', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Gène', 'Référence externe', dictionnary);
  });

  it('Gène - RQDM', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM v1)',
                         'Congenital Myopathies (MYOC v1)',
                         'Global Developmental Delay / Intellectual Disability (Trio) (RGDI v3)',
                         'Hematological Malignancies Predisposition (TUHEM v3)',
                         'Congenital Myasthenia (MYAC v1)',
                         'Global Muscular Diseases (MMG v2)',
                         'Muscular Dystrophies (DYSM v1)',
                         'Nuclear Mitochondriopathies (MITN v4)',
                         'Pediatric Cancer Predisposition (TUPED v3)',
                         'Polymalformation postnatal context (POLYM v1)',
                         'RGDI+ (RGDI+ v6)',
                         'Rhabdomyolysis (RHAB v1)',
                         'Solid Tumor (Somatic) (SSOLID v2)',
                         'Leukemia (Somatic) (SHEMA v3)',
                         'Severe Combined Immune Deficiency (SCID v1)',
                         'Thrombocytopenia (THBP v1)',
                         'Global Immune Disorders (IEI v1)',
                         'HLH (HLH v1)',
                         'VEOIBD (VEOIBD v1)',
                         'Epilepsy (EPILEP v1)',
                         'Neurodevelopmental disorders (RGDIEP v1)',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Gène', 'RQDM', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Gène', 'RQDM', dictionnary);
  });

  it('Gène - OMIM (transmission)', () => {
    const dictionnary = ['AD',
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
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Gène', 'OMIM (transmission)', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Gène', 'OMIM (transmission)', dictionnary);
  });

  it('Pathogénicité - ClinVar', () => {
    const dictionnary = ['Benign',
                         'Likely Benign',
                         'Uncertain Significance',
                         'Conflicting Interpretations of Pathogenicity',
                         'Pathogenic',
                         'Not Provided',
                         'Drug Response',
                         'Risk Factor',
                         'Likely Pathogenic',
                         'Association',
                         'Other',
                         'Affects',
                         'Protective',
                         'Confers Sensitivity',
                         'Uncertain Risk Allele',
                         'Association Not Found',
                         'Likely Risk Allele',
                         'Low Penetrance',
                         'Conflicting Classifications of Pathogenicity',
                         'No Classification for the Single Variant',
                         'Conflicting Data from Submitters',
                         'Established Risk Allele',
                         'Likely Pathogenic, Low Penetrance',
                         'Pathogenic, Low Penetrance',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'ClinVar', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'ClinVar', dictionnary);
  });

  it('Pathogénicité - ACMG de Exomiser (max)', () => {
    const dictionnary = ['Pathogenic',
                         'Likely Pathogenic',
                         'Uncertain Significance',
                         'Likely Benign',
                         'Benign',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'ACMG de Exomiser (max)', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'ACMG de Exomiser (max)', dictionnary);
  });

  it('Pathogénicité - Critères ACMG de Exomiser (max) [CLIN-2597]', () => {
    const dictionnary = ['PVS1',
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
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'Critères ACMG de Exomiser (max)', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'Critères ACMG de Exomiser (max)', dictionnary);
  });

  it('Pathogénicité - ACMG de Franklin', () => {
    const dictionnary = ['Pathogenic',
                         'Likely Pathogenic',
                         'Uncertain Significance',
                         'Likely Benign',
                         'Benign',
                         'Possibly Pathogenic Moderate',
                         'Possibly Pathogenic Benign',
                         'Possibly Pathogenic Low',
                         'Possibly Benign',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'ACMG de Franklin', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'ACMG de Franklin', dictionnary);
  });

  it('Pathogénicité - Critères ACMG de Franklin', () => {
    const dictionnary = ['PVS1',
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
                         'BS4',
                         'BP1',
                         'BP2',
                         'BP3',
                         'BP4',
                         'BP6',
                         'BS3',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'Critères ACMG de Franklin', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'Critères ACMG de Franklin', dictionnary);
  });

  it('Pathogénicité - VEP', () => {
    const dictionnary = ['HIGH',
                          'MODERATE',
                          'LOW',
                          'MODIFIER',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'VEP', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'VEP', dictionnary);
  });

  it('Pathogénicité - FATHMM', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'FATHMM', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'FATHMM', dictionnary);
  });

  it('Pathogénicité - LRT', () => {
    const dictionnary = ['Deleterious',
                          'Neutral',
                          'Unknown',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'LRT', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'LRT', dictionnary);
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    const dictionnary = ['Benign',
                          'Damaging',
                          'Possibily Damaging',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'Polyphen 2 HVAR', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'Polyphen 2 HVAR', dictionnary);
  });

  it('Pathogénicité - SIFT', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'SIFT', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'SIFT', dictionnary);
  });

  it('Pathogénicité - CMC tier', () => {
    const dictionnary = ['Tier 1',
                         'Tier 2',
                         'Tier 3',
                         'Other',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'CMC tier', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'CMC tier', dictionnary);
  });

  it('Pathogénicité - Hotspot', () => {
    const dictionnary = ['True',
                         'False',
                         'No Data'];

    cy.visitVariantsPage(SharedFilters.variant.noResults);
    cy.validateDictionnaryPresetValues('Pathogénicité', 'Hotspot', dictionnary);

    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    cy.validateDictionnaryNewValues('Pathogénicité', 'Hotspot', dictionnary);
  });
});
