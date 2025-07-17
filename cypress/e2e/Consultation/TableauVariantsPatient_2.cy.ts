/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { getStartPosition } from '../../pom/shared/Utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('M : P', 0);
  cy.showColumn('HC', 0);
  cy.showColumn('HCP', 0);
  cy.showColumn('Trans.', 0);
  cy.showColumn('QP', 0);
  cy.showColumn('OP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn(/^CMC$/, 0);
  cy.showColumn('Tier', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
  cy.showColumn('Crit. Fra.', 0);
});

describe('Page des variants d\'un patient - Consultation du tableau', () => { 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"]`).contains(data.variantGermline.variant).invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains(getStartPosition(data.variantGermline)).should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(7).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs138817389');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(8).find('[data-icon="plus"]').clickAndWait({force: true});
    cy.validatePillSelectedQuery('Gène', [data.variantGermline.gene]);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(11).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(12).find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/198752');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(15).find('a[href]').should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snp/chr1-248441241-C-T-HG38');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(19).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount(`${data.variantGermline.rqdmP} Résultats`);
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(34).find('a[href]')
      .should('have.attr', 'href', 'https://cancer.sanger.ac.uk/cosmic/search?q=COSV52051792&genome=38#');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(35).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snpTumor/chrX-123403094-G-A-hg38');
  });
});
  