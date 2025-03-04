/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Filtrer avec les facettes', () => {
  it('Pathogénicité - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Pathogénicité');
  });

  it('Pathogénicité - ClinVar', () => {
    cy.validateFacetFilter('Pathogénicité', 'ClinVar', 'Likely Benign', 'Likely_benign', /^1 27\d{1}$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('Pathogénicité - VEP', () => {
    cy.validateFacetFilter('Pathogénicité', 'VEP', 'HIGH', 'HIGH', /^671$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('Pathogénicité - Score Exomiser', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'Score Exomiser', '0.6', /^184 075$/);
    cy.validateFacetRank(2, 'Score Exomiser');
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    cy.validateFacetFilter('Pathogénicité', 'ACMG de Exomiser', 'Uncertain Significance', 'UNCERTAIN_SIGNIFICANCE', /^13$/);
    cy.validateFacetRank(3, 'ACMG de Exomiser');
  });

  it('Pathogénicité - Critères ACMG de Exomiser', () => {
    cy.validateFacetFilter('Pathogénicité', 'Critères ACMG de Exomiser', 'BP4 Moderate', 'BP4_Moderate', /^3$/);
    cy.validateFacetRank(4, 'Critères ACMG de Exomiser');
  });

  it('Pathogénicité - Score Franklin', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'Score Franklin', '0.05', /^184 077$/);
    cy.validateFacetRank(5, 'Score Franklin');
  });

  it('Pathogénicité - ACMG de Franklin', () => {
    cy.validateFacetFilter('Pathogénicité', 'ACMG de Franklin', 'Possibly Benign', 'POSSIBLY_BENIGN', /^1$/);
    cy.validateFacetRank(6, 'ACMG de Franklin');
  });

  it('Pathogénicité - Critères ACMG de Franklin', () => {
    cy.validateFacetFilter('Pathogénicité', 'Critères ACMG de Franklin', 'BP4', 'BP4', /^2$/);
    cy.validateFacetRank(7, 'Critères ACMG de Franklin');
  });

  it('Pathogénicité - CADD (Phred)', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'CADD (Phred)', '0.01', /^183 755$/);
    cy.validateFacetRank(8, 'CADD (Phred)');
  });

  it('Pathogénicité - CADD (raw)', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'CADD (raw)', '0.01', /^182 769$/);
    cy.validateFacetRank(9, 'CADD (raw)');
  });

  it('Pathogénicité - DANN', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'DANN', '0.05', /^184 051$/);
    cy.validateFacetRank(10, 'DANN');
  });

  it('Pathogénicité - FATHMM', () => {
    cy.validateFacetFilter('Pathogénicité', 'FATHMM', 'Tolerated', 'T', /^9 183$/);
    cy.validateFacetRank(11, 'FATHMM');
  });

  it('Pathogénicité - LRT', () => {
    cy.validateFacetFilter('Pathogénicité', 'LRT', 'Neutral', 'N', /^6 653$/);
    cy.validateFacetRank(12, 'LRT');
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    cy.validateFacetFilter('Pathogénicité', 'Polyphen 2 HVAR', 'Possibily Damaging', 'P', /^749$/);
    cy.validateFacetRank(13, 'Polyphen 2 HVAR');
  });

  it('Pathogénicité - SIFT', () => {
    cy.validateFacetFilter('Pathogénicité', 'SIFT', 'Deleterious', 'D', /^2 107$/);
    cy.validateFacetRank(14, 'SIFT');
  });

  it('Pathogénicité - SpliceAI', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'SpliceAI', '0.01', /^123 409$/);
    cy.validateFacetRank(15, 'SpliceAI');
  });

  it('Pathogénicité - REVEL', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'REVEL', '0.01', /^183 946$/);
    cy.validateFacetRank(16, 'REVEL');
  });

  it('Pathogénicité - CMC', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'CMC', '5', /^173 355$/);
    cy.validateFacetRank(17, 'CMC');
  });

  it('Pathogénicité - CMC (ratio)', () => {
    cy.validateFacetNumFilter('Min', 'Pathogénicité', 'CMC (ratio)', '0.01', /^16$/);
    cy.validateFacetRank(18, 'CMC (ratio)');
  });

  it('Pathogénicité - CMC tier', () => {
    cy.validateFacetFilter('Pathogénicité', 'CMC tier', 'Tier 3', '3', /^26\d{1}$/);
    cy.validateFacetRank(19, 'CMC tier');
  });
});
