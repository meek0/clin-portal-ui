/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'), false);
});

describe('Affichage de la page Logout', () => {
  it('Vérifier le texte affiché', () => {
    cy.logout();
    cy.contains('Analyses et diagnostics').should('exist');
    cy.contains('Le Centre québécois de génomique clinique offre une plateforme clinique de séquençage à haut débit pour le diagnostic moléculaire des patients québécois en partenariat avec les huit laboratoires du Réseau de diagnostic moléculaire du Québec.').should('exist');
    cy.contains('Connexion').should('exist');
    cy.contains('EN').should('exist');
  });

  it('Vérifier les images des partenaires', () => {
    cy.logout();
    cy.get('[class*="Landing_logoRow"]').eq(0).find('svg').its('length').should('eq', 4);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('svg').its('length').should('eq', 2);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('img').its('length').should('eq', 2);
    cy.get('[class*="Landing_sssLogoContainer"]').find('svg').its('length').should('eq', 1);
  });
});
