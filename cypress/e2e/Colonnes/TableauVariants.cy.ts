/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Colonnes du tableau', () => {

    beforeEach(() => {
      cy.visitVariantsPage();
    });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Variant').should('exist');
    
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('dbSNP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Gène').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Conséquence').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('MANE').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('OMIM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('ClinVar').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains(/^gnomAD $/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('gnomAD ALT').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('RQDM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains(/^CMC$/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(13)
      .should('have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="fire"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(14)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Exo. (var)').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Tier').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(14)
      .contains('Tier').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Max Fra.').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(15)
      .contains('Max Fra.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Max Exo.').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(16)
      .contains('Max Exo.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(15)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('ACMG F.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(16)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('ACMG E.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(17)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Crit. Fra.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('CADD').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(20)
      .contains('CADD').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('REVEL').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(21)
      .contains('REVEL').should('exist');
/* CLICE-120
    cy.get('thead[class="ant-table-thead"]')
      .contains('CADD (Phred)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(22)
      .contains('CADD (Phred)').should('exist');*/
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
      .contains('Tier').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Tier')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Tier').should('exist');
  });

  it.skip('Déplacer une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(3)
      .contains('dbSNP').should('exist');

    // Le drag and drop ne fonctionne pas
    cy.get('div[class="ant-popover-inner"]')
      .find('span[aria-roledescription="sortable"]').eq(1).focus()
      .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__gZAeY"]')
      .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
      .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(2)
      .contains('dbSNP').should('exist');
  });
});
