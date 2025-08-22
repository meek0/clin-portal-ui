/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Pilule personnalisée', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
  };

  it('Valider la couleur', () => {
    setupTest();
    cy.get(`[data-cy="SidebarMenuItem_Mes requêtes"]`).clickAndWait({force: true});

    cy.intercept('POST', '**/graphql').as('getRouteMatcher');
    cy.get('[class*="QueriesSidebar_queryPill"]').contains('Cypress').clickAndWait({force: true});
    cy.wait('@getRouteMatcher');

    cy.get('[class*="QueryPill_selected"]').should('have.css', 'background-color', 'rgb(35, 164, 215)');

    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_title"]').contains('Cypress').should('exist');
    cy.get('body').contains(/5 \d{3}/).should('exist');
  });
});
