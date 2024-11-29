/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (somatic) - Consultation du tableau', () => {  
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').contains('chr10:g.1096268T>C').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('1 096 268').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(7).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs10794716');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/618586');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(8).find('[data-icon="plus"]').clickAndWait({force: true});
    cy.validatePillSelectedQuery('Gène', ['WDR37']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(11).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/618586');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(12).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1185321');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(14).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snpTumor/chr10-114441020-G-A-hg38');
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(15).find('a[href]')
      .should('have.attr', 'href', 'https://cancer.sanger.ac.uk/cosmic/search?q=COSV53313027&genome=38#');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(18).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount(/^13\d{1}$/);
  });
 
  it('Valider les liens disponibles Lien RQDM TO', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] td').eq(19).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount(/^13\d{1}$/);
  });
});
