/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantEntityPage('1-45508847-C-T', 3);
});

describe('Page d\'un variant (onglet Résumé) - Vérifier les informations affichées', () => {
  it('Panneau Résumé', () => {
    cy.get('[data-cy="Summary_Chromosome"]').contains('1').should('exist');
    cy.get('[data-cy="Summary_Start"]').contains('45 508 847').should('exist');
    cy.get('[data-cy="Summary_AlleleAlt"]').contains('T').should('exist');
    cy.get('[data-cy="Summary_AlleleRef"]').contains('C').should('exist');
    cy.get('[data-cy="Summary_Type"]').contains('SNV').should('exist');
    cy.get('[data-cy="Summary_Cytoband"]').contains('1p34.1').should('exist');
    cy.get('[data-cy="Summary_GenomeRef"]').contains('GRCh38').should('exist');
    cy.get('[data-cy="Summary_Clinvar"]').contains('Pathogenic').should('exist');
    cy.get('[data-cy="Summary_dbSNP"]').contains('rs370596113').should('exist');
    cy.get('[data-cy="Summary_FreqRQDMTotalPc"]').contains(/^1 \/\d{3}$/).should('exist');
    cy.get('[data-cy="Summary_FreqRQDMTotalAf"]').contains(/^\d{1}.\d{2}e-3$/).should('exist');
    cy.get('[data-cy="Summary_LastAnnotation"]').contains(/^\d{4}-\d{2}-\d{2}$/).should('exist');
  });
  
  it('Panneau Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('PRDX1').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('Omim').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('176763').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('protein_coding').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('SpliceAI').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('ND').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('pLI').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('7.70e-10').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('LOEUF').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('1.905').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(0).contains('-').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(1).contains('Downstream Gene Variant').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(3).contains('MODIFIER').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(5).contains('-').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(6).contains('ENST00000319248').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(6).find('svg[class*="canonicalIcon"]').should('exist');
    cy.get('[data-row-key="Consequences_PRDX1_1"] td[class*="ant-table-cell"]').eq(7).contains('NM_181697.3').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('5 autres transcrits +').should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"] tr[class*="ant-table-row"]').eq(1).should('not.exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('MMACHC').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('Omim').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('609831').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('protein_coding').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('SpliceAI').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('0.01').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('AL').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('pLI').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('1.14e-13').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('LOEUF').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('1.755').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(0).contains('p.Arg161Ter').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(1).contains('Stop Gained').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(2).contains('c.481C>T').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(3).contains('HIGH').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('Cadd (Raw):').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('6.95').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('Cadd (Phred):').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('36').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('Voir plus').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(4).contains('Dann').should('not.exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(5).contains('0.599').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(6).contains('ENST00000401061').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(6).find('svg[class*="canonicalIcon"]').should('exist');
    cy.get('[data-row-key="Consequences_MMACHC_1"] td[class*="ant-table-cell"]').eq(7).contains('NM_015506.3').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"]').contains('1 autres transcrits +').should('exist');
    cy.get('[data-cy="Consequences_MMACHC_Space"] tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Panneau Cohortes du RQDM', () => {
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(1).contains(/^0 \/ \d{2,3}| \(0%\)$/).should('exist');
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(3).contains(/^0 \/ \d{2,3} \(0%\)$/).should('exist');
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(5).contains(/^0 \/ \d{1,2} \(0%\)$/).should('exist');
    cy.get('[data-row-key="RGDI"] td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(1).contains(/^1 \/ 4\d{1} \(2.\d{1}%\)$/).should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(3).contains('1 / 40 (2.5%)').should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(5).contains(/^0 \/ \d{1} \(0%\)$/).should('exist');
    cy.get('[data-row-key="MYOC"] td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(1).contains('0 / 61 (0%)').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(3).contains('0 / 61 (0%)').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(5).contains('0 / 0 (0%)').should('exist');
    cy.get('[data-row-key="HYPM"] td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(1).contains(/^1 \/ \d{3} \(\d\.\d+%\)$/).should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(3).contains(/^1 \/ \d{3} \(\d\.\d+%\)$/).should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(5).contains(/^0 \/ \d{1,2} \(0%\)$/).should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_Row_Summary"] td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
  });
  
  it('Panneau Cohortes publiques', () => {
    cy.get('[data-row-key="FrequencyCard_Cohort_TopMed"] td[class="ant-table-cell"]').eq(1).contains('3').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_TopMed"] td[class="ant-table-cell"]').eq(2).contains('125 568').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_TopMed"] td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_TopMed"] td[class="ant-table-cell"]').eq(4).contains('2.39e-5').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v3)"] td[class="ant-table-cell"]').eq(1).contains('9').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v3)"] td[class="ant-table-cell"]').eq(2).contains('143 248').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v3)"] td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v3)"] td[class="ant-table-cell"]').eq(4).contains('6.28e-5').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v2.1.1)"] td[class="ant-table-cell"]').eq(1).contains('2').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v2.1.1)"] td[class="ant-table-cell"]').eq(2).contains('31 370').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v2.1.1)"] td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Genome (v2.1.1)"] td[class="ant-table-cell"]').eq(4).contains('6.38e-5').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Exome (v2.1.1)"] td[class="ant-table-cell"]').eq(1).contains('5').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Exome (v2.1.1)"] td[class="ant-table-cell"]').eq(2).contains('249 386').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Exome (v2.1.1)"] td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_gnomAD Exome (v2.1.1)"] td[class="ant-table-cell"]').eq(4).contains('2.00e-5').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_1000 Genomes"] td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_1000 Genomes"] td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_1000 Genomes"] td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="FrequencyCard_Cohort_1000 Genomes"] td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau ClinVar', () => {
    cy.get('[data-cy="ClinicalCard_ClinVar_95703_ExternalLink"]').contains('95703').should('exist');
    cy.get('[data-cy="ClinicalCard_ClinVar_95703_ExternalLink"] svg[class*="anticon"]').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_1"] td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_1"] td[class="ant-table-cell"]').eq(1).contains('Cobalamin C disease').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_1"] td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_2"] td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_2"] td[class="ant-table-cell"]').eq(1).contains('Methylmalonic acidemia with homocystinuria cblC').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_2"] td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_0"] td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_0"] td[class="ant-table-cell"]').eq(1).contains('not provided').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_0"] td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_3"] td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_3"] td[class="ant-table-cell"]').eq(1).contains('MMACHC-related disorder').should('exist');
    cy.get('[data-row-key*="ClinicalCard_ClinVar_3"] td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
  });
  
  it('Panneau Gène - Phénotype', () => {
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_Orphanet_MMACHC"] td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_Orphanet_MMACHC"] td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_Orphanet_MMACHC"] td[class="ant-table-cell"]').eq(2).contains('Methylmalonic acidemia with homocystinuria, type cblC').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_Orphanet_MMACHC"] td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_PRDX1"] td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_PRDX1"] td[class="ant-table-cell"]').eq(1).contains('PRDX1 (MIM:').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_PRDX1"] td[class="ant-table-cell"]').eq(2).contains('Methylmalonic aciduria and homocystinuria, cblC type, digenic').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_PRDX1"] td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_MMACHC"] td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_MMACHC"] td[class="ant-table-cell"]').eq(1).contains('MMACHC (MIM:').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_MMACHC"] td[class="ant-table-cell"]').eq(2).contains('Methylmalonic aciduria and homocystinuria, cblC type').should('exist');
    cy.get('[data-row-key*="ClinicalCard_GenePhenotype_OMIM_MMACHC"] td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');

    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_MMACHC"] td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_MMACHC"] td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_MMACHC"] td[class="ant-table-cell"]').eq(2).contains(/(Abnormal brain morphology|Peripheral demyelination|Respiratory distress|Smooth philtrum|Vomiting|Nephropathy|Ataxia|Intellectual disability|Personality changes|Neonatal onset|Severe demyelination of the white matter|Abnormal circulating vitamin B12 concentration|Pigmentary retinopathy|Abnormal heart morphology|Metabolic acidosis|Decreased circulating adenosylcobalamin concentration|Stroke|Childhood onset|Hypoglycemia|Abnormal facial shape|Tremor|Global developmental delay|Hyperammonemia|Confusion|Atrophy of the spinal cord|Abnormality of extrapyramidal motor function|Middle age onset|Low-set ears|Abnormality of the nervous system|Pulmonary arterial hypertension|High forehead|Failure to thrive|Feeding difficulties in infancy|Hydrocephalus|Macrotia|Hypothermia|Microcephaly|Long face|Hypomethioninemia|Dehydration|Elevated circulating palmitoleylcarnitine concentration|Psychosis|Bradycardia|Megaloblastic anemia|Intrauterine growth retardation|Feeding difficulties|Infantile spasms|Hypotonia|Seizure|Lethargy|Reduced visual acuity|Dilated cardiomyopathy|Hydrops fetalis|Homocystinuria|Autosomal recessive inheritance|Decreased circulating methylcobalamin concentration|Axial hypotonia|Jaundice|Cerebral cortical atrophy|Cerebral atrophy|Optic atrophy|Young adult onset|Infantile onset|Macular coloboma|Pulmonary embolism|Retinal degeneration|Thrombocytopenia|Abnormal speech pattern|Juvenile onset|Hepatomegaly|Ketonuria|Proteinuria|Neurodevelopmental delay|Decreased methylmalonyl-CoA mutase activity|Thromboembolism|Decreased methionine synthase activity|Auditory hallucination|Hyperhomocystinemia|Small for gestational age|Delirium|Acute kidney injury|Tachycardia|Neutropenia|Subdural hemorrhage|Poor fine motor coordination|Nystagmus|Impaired executive functioning|Developmental regression|Dementia|Abnormality of macular pigmentation|Growth delay|Methylmalonic aciduria|Methylmalonic acidemia|Pallor|Atypical behavior|Hematuria|Cardiac arrest|Hemolytic-uremic syndrome|Leukoencephalopathy|Encephalopathy|Deep venous thrombosis|Mental deterioration|Stomatitis|Renal insufficiency|Glomerulopathy|Memory impairment|Hypotension|Generalized hypotonia|Cystathioninuria|Periventricular white matter hyperintensities|Cystathioninemia|Visual impairment|Glossitis)/).should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_MMACHC"] td[class="ant-table-cell"]').eq(2).contains('Voir plus').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_MMACHC"] td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"] td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"] td[class="ant-table-cell"]').eq(1).contains('PRDX1').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"] td[class="ant-table-cell"]').eq(2).contains(/(Bradycardia|Reduced visual acuity|Neonatal onset|Nephropathy|Intellectual disability|Young adult onset|Generalized hypotonia|Small for gestational age|Hypomethioninemia|Childhood onset|Long face|Feeding difficulties in infancy|Vomiting|Decreased circulating methylcobalamin concentration|Decreased methionine synthase activity|Cystathioninemia|Hepatomegaly|Thrombocytopenia|Seizure|Cerebral cortical atrophy|Tremor|Nystagmus|Abnormal circulating vitamin B12 concentration|Hyperhomocystinemia|Homocystinuria|Juvenile onset|Hemolytic-uremic syndrome|Infantile onset|Proteinuria|Tachycardia|Global developmental delay|Neutropenia|Low-set ears|Failure to thrive|Methylmalonic aciduria|Lethargy|Thromboembolism|Macrotia|Pigmentary retinopathy|Acute kidney injury|Hypotonia|Decreased methylmalonyl-CoA mutase activity|Pallor|Megaloblastic anemia|Autosomal recessive inheritance|Metabolic acidosis|Hypotension|Visual impairment|Microcephaly|Abnormality of extrapyramidal motor function|Cardiac arrest|High forehead|Axial hypotonia|Hydrocephalus|Methylmalonic acidemia|Hematuria|Pulmonary arterial hypertension|Delirium|Smooth philtrum|Renal insufficiency|Confusion|Decreased circulating adenosylcobalamin concentration|Middle age onset|Cystathioninuria|Dementia)/).should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"] td[class="ant-table-cell"]').eq(2).contains('Voir plus').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"] td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_DDD_MMACHC"] td[class="ant-table-cell"]').eq(0).contains('DDD').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_DDD_MMACHC"] td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_DDD_MMACHC"] td[class="ant-table-cell"]').eq(2).contains('METHYLMALONIC ACIDURIA AND HOMOCYSTINURIA, CBLC TYPE').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_DDD_MMACHC"] td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
  });
});

describe('Page d\'un variant (onglet Résumé) - Valider les liens disponibles', () => {
  it('Lien ClinVar de la section Résumé', () => {
    cy.get('[data-cy="Summary_Clinvar_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/95703');
  });

  it('Lien dbSNP de la section Résumé', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs370596113');
    cy.get('body').contains(/^rs370596113$/).should('exist');
  });

  it('Lien du gène de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Gene_ExternalLink"]')
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=PRDX1');
  });
  
  it('Lien Omim de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Omim_ExternalLink"]')
      .should('have.attr', 'href', 'https://omim.org/entry/176763');
  });
  
  it('Lien SpliceAI de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_SpliceAi_ExternalLink"]')
      .should('have.attr', 'href', 'https://spliceailookup.broadinstitute.org/#variant=1-45508847-C-T&hg=38&distance=50&mask=0&precomputed=0');
  });
  
  it('Lien pLI de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Pli_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000117450?dataset=gnomad_r2_1');
  });
  
  it('Lien LOEUF de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Loeuf_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000117450?dataset=gnomad_r2_1');
  });
  
  it('Lien RefSeq de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_RefSeq_NM_181697.3_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_181697.3?report=graph');
  });
  
  it('Lien \'5 autres transcrits\' de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('5 autres transcrits +').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_PRDX1_Space"] tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('Afficher moins -').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_PRDX1_Space"] tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Lien TopMed de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_TopMed_ExternalLink"]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-45508847-C-T');
  });
  
  it('Lien gnomAD Genome (v3) de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_gnomAD Genome (v3)_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-45508847-C-T?dataset=gnomad_r3');
  });
  
  it('Lien ClinVar de la section ClinVar', () => {
    cy.get('[data-cy="ClinicalCard_ClinVar_95703_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/95703');
  });
  
  it('Lien de la condition Orphanet de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_Condition_11308_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=11308');
  });
  
  it('Lien OMIM du gène de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_Omim_176763_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/176763');
  });
  
  it('Lien OMIM de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_OmimCondition_277400_ExternalLink"]').first()
      .should('have.attr', 'href', 'https://www.omim.org/entry/277400');
  });
  
  it('Lien HPO de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-cy*="ClinicalCard_GenePhenotype_HpoCondition_HP:"]').eq(0)
      .should('have.attr', 'href').and('match', /https:\/\/hpo\.jax\.org\/app\/browse\/term\/HP:*/);
  });
  
  it('Lien \'See more\' de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Voir plus').clickAndWait({force: true});
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Renal insufficiency').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Voir moins').clickAndWait({force: true});
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Renal insufficiency').should('not.exist');
  });
});

describe('Page d\'un variant (onglet Résumé) - Valider les panneaux masquables', () => {
  it('Panneau Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Consequences_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Consequences_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Cohortes du RQDM', () => {
    cy.get('[data-cy="FrequencyCard_RQDM_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FrequencyCard_RQDM_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="FrequencyCard_RQDM_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FrequencyCard_RQDM_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="FrequencyCard_Cohort_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FrequencyCard_Cohort_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="FrequencyCard_Cohort_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FrequencyCard_Cohort_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau ClinVar', () => {
    cy.get('[data-cy="ClinicalCard_ClinVar_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="ClinicalCard_ClinVar_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="ClinicalCard_ClinVar_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="ClinicalCard_ClinVar_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="ClinicalCard_ClinVar_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="ClinicalCard_GenePhenotype_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="ClinicalCard_GenePhenotype_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="ClinicalCard_GenePhenotype_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="ClinicalCard_GenePhenotype_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
