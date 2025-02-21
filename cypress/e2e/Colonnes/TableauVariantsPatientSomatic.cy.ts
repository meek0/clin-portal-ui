/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Page des variants d\'un patient (somatic) - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="flag"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="message"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Variant').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Bioinfo').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('dbSNP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Gène').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Conséquence').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('MANE').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('OMIM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('ClinVar').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(13)
      .should('have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="fire"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(14)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Tier').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(15)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('CMC').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(16)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains(/^gnomAD $/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('gnomAD ALT').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('gnomAD ALT').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(17)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('RQDM G').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(18)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('RQDM TO').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(19)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('QS').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(20)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Zyg.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('QP').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(18)
      .contains('QP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains(/^A$/).should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(19)
      .contains(/^A$/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('A+R').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(20)
      .contains('A+R').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('A/(A+R)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(21)
      .contains('A/(A+R)').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Filtre').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(22)
      .contains('Filtre').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('CADD').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(23)
      .contains('CADD').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('REVEL').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(24)
      .contains('REVEL').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Type').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Type')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Type').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('gnomAD ALT').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('gnomAD ALT')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('gnomAD ALT').should('exist');
  });
});
