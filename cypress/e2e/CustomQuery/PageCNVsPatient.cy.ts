/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient - Pilule personnalisée', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Valider la couleur', () => {
    setupTest();
    cy.get(`[data-cy="SidebarMenuItem_Mes requêtes"]`).clickAndWait({force: true});

    cy.intercept('POST', '**/graphql').as('getRouteMatcher');
    cy.get('[class*="QueriesSidebar_queryPill"]').contains('Cypress').clickAndWait({force: true});
    cy.wait('@getRouteMatcher');

    cy.get('[class*="QueryPill_selected"]').should('have.css', 'background-color', 'rgb(35, 164, 215)');

    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_title"]').contains('Cypress').should('exist');
    cy.get('body').contains(/1\d{2}/).should('exist');
  });
});
