/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Page des variants d\'un patient (somatic) - Pilule personnalisée', () => {
  it('Valider la couleur', () => {
    cy.get(`[data-cy="SidebarMenuItem_Requêtes"]`).clickAndWait({force: true});

    cy.intercept('POST', '**/graphql').as('getRouteMatcher');
    cy.get('[class*="QueriesSidebar_queryPill"]').contains('Cypress').clickAndWait({force: true});
    cy.wait('@getRouteMatcher');

    cy.get('[class*="QueryPill_selected"]').should('have.css', 'background-color', 'rgb(35, 164, 215)');

    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_title"]').contains('Cypress').should('exist');
    cy.get('body').contains(/1\d{2} \d{3}/).should('exist');
  });
});
