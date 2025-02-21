/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Colonnes du tableau des prescriptions', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('have.class', 'ant-table-selection-column');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(1)
      .find('[role="img"]')
      .should('have.class', 'anticon-user');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Prescription').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Patient').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Priorité').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Statut').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Créée le').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Modifiée le').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(6)
      .contains('Modifiée le').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Analyse').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Bioinfo').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('LDM').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('EP').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Requérant').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Requérant').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Prénatal').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('Prénatal').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Dossier').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('Dossier').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Prescription').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Prescription')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Prescription').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Modifiée le').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Modifiée le')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Modifiée le').should('exist');
  });
});
