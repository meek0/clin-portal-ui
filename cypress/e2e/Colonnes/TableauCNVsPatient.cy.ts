/// <reference types="cypress" />
import '../../support/commands';
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Colonnes du tableau', () => {

  beforeEach(() => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Actions').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="flag"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Gènes').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Variant').should('exist');
    
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Chr.').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Début').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Fin').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Événement').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Longueur').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('MS').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('MS').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('CN').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('# Gènes').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('GT').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('GT').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Filtre').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('Filtre').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Qual.').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(14)
      .contains('Qual.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('BC').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(15)
      .contains('BC').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('PE').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(16)
      .contains('PE').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Chr.').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Chr.')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Chr.').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('GT').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('GT')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('GT').should('exist');
  });

  it.skip('Déplacer une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(3)
      .contains('Début').should('exist');

    // Le drag and drop ne fonctionne pas
    cy.get('div[class="ant-popover-inner"]')
      .find('span[aria-roledescription="sortable"]').eq(1).focus()
      .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__gZAeY"]')
      .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
      .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(2)
      .contains('Début').should('exist');
  });
});
