/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Dictionnaires', () => {
  describe('Page Variants', () => {

    beforeEach(() => {
      cy.visitVariantsPage();
    });

    describe('Patient', () => {
      beforeEach(() => {
        cy.get('li[data-key="patient"]').click({force: true});
      });

      it('Analyse', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('Analyse', 0, dictionnary);
      });

      it('Statut clinique', () => {
        const dictionnary = ['Atteint',
                             'Non atteint',
                             'Inconnu'];

        cy.validateDictionnary('Statut clinique', 1, dictionnary);
      });

      it('Sexe', () => {
        const dictionnary = ['Female',
                             'Male',
                             'Other',
                             'Unknown'];

        cy.validateDictionnary('Sexe', 2, dictionnary);
      });
    });

    describe('Variant', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_variant"]').click({force: true});
      });

      it('Type de variant', () => {
        const dictionnary = ['Insertion',
                             'Délétion',
                             'SNV',
                             'No Data'];

        cy.validateDictionnary('Type de variant', 0, dictionnary);
      });

      it('Conséquences', () => {
        const dictionnary = ['Transcript Ablation',
                             'Splice Acceptor Variant',
                             'Splice Donor Variant',
                             'Stop Gained',
                             'Frameshift Variant',
                             'Stop Lost',
                             'Start Lost',
                             'Transcript Amplification',
                             'Inframe Insertion',
                             'Inframe Deletion',
                             'Missense Variant',
                             'Protein Altering Variant',
                             'Splice Region Variant',
                             'Splice Donor 5th Base Variant',
                             'Splice Donor Region Variant',
                             'Splice Polypyrimidine Tract Variant',
                             'Incomplete Terminal Codon Variant',
                             'Start Retained Variant',
                             'Stop Retained Variant',
                             'Synonymous Variant',
                             'Coding Sequence Variant',
                             'Mature MiRNA Variant',
                             '5 Prime UTR Variant',
                             '3 Prime UTR Variant',
                             'Non Coding Transcript Exon Variant',
                             'Intron Variant',
                             'NMD Transcript Variant',
                             'Non Coding Transcript Variant',
                             'Upstream Gene Variant',
                             'Downstream Gene Variant',
                             'TFBS Ablation',
                             'TFBS Amplification',
                             'TF Binding Site Variant',
                             'Regulatory Region Ablation',
                             'Regulatory Region Amplification',
                             'Feature Elongation',
                             'Regulatory Region Variant',
                             'Feature Truncation',
                             'Intergenic Variant',
                             'No Data'];

        cy.validateDictionnary('Conséquences', 1, dictionnary);
      });

      it('Référence externe', () => {
        const dictionnary = ['DBSNP',
                             'Clinvar',
                             'Pubmed',
                             'No Data'];

        cy.validateDictionnary('Référence externe', 2, dictionnary);
      });

      it('Chromosome', () => {
        const dictionnary = ['1',
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
                             'No Data'];

        cy.validateDictionnary('Chromosome', 3, dictionnary);
      });

      it('Zygosité', () => {
        const dictionnary = ['HOM',
                             'HEM',
                             'HET'];

        cy.validateDictionnary('Zygosité', 5, dictionnary);
      });

      it('Transmission', () => {
        const dictionnary = ['Autosomal Dominant De Novo',
                             'Autosomal Dominant',
                             'Autosomal Recessive',
                             'X Linked Dominant De Novo',
                             'X Linked Recessive De Novo',
                             'X Linked Dominant',
                             'X Linked Recessive',
                             'Non Carrier Proband',
                             'Unknown Parents Genotype',
                             'Unknown Proband Genotype',
                             'No Data'];

        cy.validateDictionnary('Transmission', 6, dictionnary);
      });
    });

    describe('Gène', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_genomic"]').click({force: true});
      });

      it('Type de gène', () => {
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
                             'Antisense/antisense RNA',
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
                             'VaultRNA/vault RNA',
                             'Bidirectional Promoter LncRNA',
                             'No Data'];

        cy.validateDictionnary('Type de gène', 0, dictionnary);
      });

      it('Référence externe', () => {
        const dictionnary = ['OMIM',
                             'HPO',
                             'Orphanet',
                             'No Data'];

        cy.validateDictionnary('Référence externe', 1, dictionnary);
      });

      it('RQDM', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('RQDM', 4, dictionnary);
      });
    });

    describe('Pathogénicité', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_pathogenicity"]').click({force: true});
      });

      it('ClinVar', () => {
        const dictionnary = ['Benign',
                             'Likely Benign',
                             'Uncertain Significance',
                             'Conflicting Interpretations Of Pathogenicity',
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
                             'No Data'];

        cy.validateDictionnary('ClinVar', 0, dictionnary);
      });

      it('Verdict ACMG', () => {
        const dictionnary = ['Pathogenic',
                             'Likely Pathogenic',
                             'Uncertain Significance',
                             'Likely Benign',
                             'Benign',
                             'No Data'];

        cy.validateDictionnary('Verdict ACMG', 1, dictionnary);
      });

      it('Critères ACMG', () => {
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
                             'PM6',
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
                             'BP5',
                             'BP6',
                             'BP7',
                             'No Data'];

        cy.validateDictionnary('Critères ACMG', 2, dictionnary);
      });

      it('VEP', () => {
        const dictionnary = ['HIGH',
                             'MODERATE',
                             'LOW',
                             'MODIFIER',
                             'No Data'];

        cy.validateDictionnary('VEP', 3, dictionnary);
      });

      it('FATHMM', () => {
        const dictionnary = ['Deleterious',
                             'Tolerated',
                             'No Data'];

        cy.validateDictionnary('FATHMM', 7, dictionnary);
      });

      it('LRT', () => {
        const dictionnary = ['Deleterious',
                             'Neutral',
                             'Unknown',
                             'No Data'];

        cy.validateDictionnary('LRT', 8, dictionnary);
      });

      it('Polyphen 2 HVAR', () => {
        const dictionnary = ['Benign',
                             'Damaging',
                             'Possibily Damaging',
                             'No Data'];

        cy.validateDictionnary('Polyphen 2 HVAR', 9, dictionnary);
      });

      it('SIFT', () => {
        const dictionnary = ['Deleterious',
                             'Tolerated',
                             'No Data'];

        cy.validateDictionnary('SIFT', 10, dictionnary);
      });
    });
  });

  describe('Page Variants Patient', () => {

    beforeEach(() => {
      cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    });

    describe('Panel RQDM', () => {
      beforeEach(() => {
        cy.get('li[data-key="rqdm"]').click({force: true});
      });

      it('RQDM', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('RQDM', 0, dictionnary);
      });
    });

    describe('Variant', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_variant"]').click({force: true});
      });

      it('Type de variant', () => {
        const dictionnary = ['Insertion',
                             'Délétion',
                             'SNV',
                             'No Data'];

        cy.validateDictionnary('Type de variant', 0, dictionnary);
      });

      it('Conséquences', () => {
        const dictionnary = ['Transcript Ablation',
                             'Splice Acceptor Variant',
                             'Splice Donor Variant',
                             'Stop Gained',
                             'Frameshift Variant',
                             'Stop Lost',
                             'Start Lost',
                             'Transcript Amplification',
                             'Inframe Insertion',
                             'Inframe Deletion',
                             'Missense Variant',
                             'Protein Altering Variant',
                             'Splice Region Variant',
                             'Splice Donor 5th Base Variant',
                             'Splice Donor Region Variant',
                             'Splice Polypyrimidine Tract Variant',
                             'Incomplete Terminal Codon Variant',
                             'Start Retained Variant',
                             'Stop Retained Variant',
                             'Synonymous Variant',
                             'Coding Sequence Variant',
                             'Mature MiRNA Variant',
                             '5 Prime UTR Variant',
                             '3 Prime UTR Variant',
                             'Non Coding Transcript Exon Variant',
                             'Intron Variant',
                             'NMD Transcript Variant',
                             'Non Coding Transcript Variant',
                             'Upstream Gene Variant',
                             'Downstream Gene Variant',
                             'TFBS Ablation',
                             'TFBS Amplification',
                             'TF Binding Site Variant',
                             'Regulatory Region Ablation',
                             'Regulatory Region Amplification',
                             'Feature Elongation',
                             'Regulatory Region Variant',
                             'Feature Truncation',
                             'Intergenic Variant',
                             'No Data'];

        cy.validateDictionnary('Conséquences', 1, dictionnary);
      });

      it('Référence externe', () => {
        const dictionnary = ['DBSNP',
                             'Clinvar',
                             'Pubmed',
                             'No Data'];

        cy.validateDictionnary('Référence externe', 2, dictionnary);
      });

      it('Chromosome', () => {
        const dictionnary = ['1',
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
                             'No Data'];

        cy.validateDictionnary('Chromosome', 3, dictionnary);
      });
    });

    describe('Gène', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_genomic"]').click({force: true});
      });

      it('Type de gène', () => {
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
                             'Antisense/antisense RNA',
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
                             'VaultRNA/vault RNA',
                             'Bidirectional Promoter LncRNA',
                             'No Data'];

        cy.validateDictionnary('Type de gène', 0, dictionnary);
      });

      it('Référence externe', () => {
        const dictionnary = ['OMIM',
                             'HPO',
                             'Orphanet',
                             'No Data'];

        cy.validateDictionnary('Référence externe', 1, dictionnary);
      });

      it('RQDM', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('RQDM', 4, dictionnary);
      });
    });

    describe('Pathogénicité', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_pathogenicity"]').click({force: true});
      });

      it('ClinVar', () => {
        const dictionnary = ['Benign',
                             'Likely Benign',
                             'Uncertain Significance',
                             'Conflicting Interpretations Of Pathogenicity',
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
                             'No Data'];

        cy.validateDictionnary('ClinVar', 0, dictionnary);
      });

      it('Verdict ACMG', () => {
        const dictionnary = ['Pathogenic',
                             'Likely Pathogenic',
                             'Uncertain Significance',
                             'Likely Benign',
                             'Benign',
                             'No Data'];

        cy.validateDictionnary('Verdict ACMG', 1, dictionnary);
      });

      it('Critères ACMG', () => {
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
                             'PM6',
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
                             'BP5',
                             'BP6',
                             'BP7',
                             'No Data'];

        cy.validateDictionnary('Critères ACMG', 2, dictionnary);
      });

      it('VEP', () => {
        const dictionnary = ['HIGH',
                             'MODERATE',
                             'LOW',
                             'MODIFIER',
                             'No Data'];

        cy.validateDictionnary('VEP', 3, dictionnary);
      });

      it('FATHMM', () => {
        const dictionnary = ['Deleterious',
                             'Tolerated',
                             'No Data'];

        cy.validateDictionnary('FATHMM', 7, dictionnary);
      });

      it('LRT', () => {
        const dictionnary = ['Deleterious',
                             'Neutral',
                             'Unknown',
                             'No Data'];

        cy.validateDictionnary('LRT', 8, dictionnary);
      });

      it('Polyphen 2 HVAR', () => {
        const dictionnary = ['Benign',
                             'Damaging',
                             'Possibily Damaging',
                             'No Data'];

        cy.validateDictionnary('Polyphen 2 HVAR', 9, dictionnary);
      });

      it('SIFT', () => {
        const dictionnary = ['Deleterious',
                             'Tolerated',
                             'No Data'];

        cy.validateDictionnary('SIFT', 10, dictionnary);
      });
    });

    describe('Occurrence', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_occurrence"]').click({force: true});
      });

      it('Zygosité', () => {
        const dictionnary = ['HOM',
                             'HEM',
                             'HET'];

        cy.validateDictionnary('Zygosité', 0, dictionnary);
      });

      it('Zygosité maternelle', () => {
        const dictionnary = ['HOM',
                             'HEM',
                             'HET',
                             'WT',
                             'UNK'];

        cy.validateDictionnary('Zygosité maternelle', 1, dictionnary);
      });

      it('Zygosité paternelle', () => {
        const dictionnary = ['HOM',
                             'HEM',
                             'HET',
                             'WT',
                             'UNK'];

        cy.validateDictionnary('Zygosité paternelle', 2, dictionnary);
      });

      it('Origine parentale', () => {
        const dictionnary = ['None (de novo)',
                             'Possible de novo',
                             'Father and Mother',
                             'Mother',
                             'Father',
                             'Possible Father',
                             'Possible Mother',
                             'Ambiguous',
                             'Unknown',
                             'No Data'];

        cy.validateDictionnary('Origine parentale', 3, dictionnary);
      });

      it('Transmission', () => {
        const dictionnary = ['Autosomal Dominant De Novo',
                             'Autosomal Dominant',
                             'Autosomal Recessive',
                             'X Linked Dominant De Novo',
                             'X Linked Recessive De Novo',
                             'X Linked Dominant',
                             'X Linked Recessive',
                             'Non Carrier Proband',
                             'Unknown Parents Genotype',
                             'Unknown Proband Genotype',
                             'No Data'];

        cy.validateDictionnary('Transmission', 4, dictionnary);
      });
    });
  });

  describe('Page CNVs Patient', () => {

    beforeEach(() => {
      cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    });

    describe('Panel RQDM', () => {
      beforeEach(() => {
        cy.get('li[data-key="rqdm"]').click({force: true});
      });

      it('RQDM', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('RQDM', 0, dictionnary);
      });
    });

    describe('Variant', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_variant"]').click({force: true});
      });

      it('Type de variant', () => {
        const dictionnary = ['GAIN',
                             'LOSS',
                             'No Data'];

        cy.validateDictionnary('Type de variant', 0, dictionnary);
      });

      it('Chromosome', () => {
        const dictionnary = ['1',
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
                             'No Data'];

        cy.validateDictionnary('Chromosome', 2, dictionnary);
      });
    });

    describe('Gène', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_genomic"]').click({force: true});
      });

      it('Panel RQDM', () => {
        const dictionnary = ['Malignant Hyperthermia (HYPM)',
                             'Congenital Myopathies (MYOC)',
                             'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                             'Hematological malignancies predisposition (TUHEM)',
                             'Congenital Myasthenia (MYAC)',
                             'Global Muscular diseases (Global Panel) (MMG)',
                             'Muscular Dystrophies (DYSM)',
                             'Nuclear Mitochondriopathies (MITN)',
                             'Pediatric cancer predisposition (TUPED)',
                             'Polymalformation (POLYM)',
                             'RGDI+ (RGDI+)',
                             'Rhabdomyolysis (RHAB)',
                             'No Data'];

        cy.validateDictionnary('Panel RQDM', 0, dictionnary);
      });
    });

    describe('Occurrence', () => {
      beforeEach(() => {
        cy.get('li[data-key="category_occurrence"]').click({force: true});
      });

      it('Filtre (Dragen)', () => {
        const dictionnary = ['PASS',
                             'CnvQual',
                             'No Data'];

        cy.validateDictionnary('Filtre (Dragen)', 0, dictionnary);
      });
    });
  });
});