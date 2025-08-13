/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
  cy.get('div[id*="tab-requests"]').clickAndWait({force: true});
  cy.resetColumns(1);
});

describe('Page des prescriptions et requêtes - Colonnes du tableau des requêtes', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('have.class', 'ant-table-selection-column');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Requête').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Patient').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Échantillon').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Priorité').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Statut').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Créée le').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Modifiée le').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(7)
      .contains('Modifiée le').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Analyse').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Projet').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Projet').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Prescription').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Parenté').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Bioinfo').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('LDM').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('EP').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(14)
      .contains('EP').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Statut clinique').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(15)
      .contains('Statut clinique').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Lot').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(16)
      .contains('Lot').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Prénatal').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(17)
      .contains('Prénatal').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Dossier').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(18)
      .contains('Dossier').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Requérant').should('not.exist');
    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').eq(19)
      .contains('Requérant').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Requête').should('exist');

    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').contains('Requête')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Requête').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Modifiée le').should('not.exist');

    cy.get('div[class="ant-popover-inner"]').eq(1)
      .find('div[class="ant-space-item"]').contains('Modifiée le')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Modifiée le').should('exist');
  });
});
