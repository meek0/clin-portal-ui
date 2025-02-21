/// <reference types="cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitArchivesPatientPage(epCHUSJ_ldmCHUSJ.patientProbId);
});

describe('Page d\'archives - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('URL').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(0)
      .contains('URL').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Nom du fichier').should('exist');
    
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Format').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .should('have.attr', 'aria-sort', 'ascending')
      .contains('Patient').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Requête').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .contains('Échantillon (LDM)').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Analyse bioinfo').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Date').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Taille').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Hash').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Hash').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Lot').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('Lot').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Actions').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Patient').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Patient')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Patient').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Taille')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('exist');
  });
});