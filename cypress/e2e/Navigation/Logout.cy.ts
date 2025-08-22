/// <reference types="cypress"/>
import '../../support/commands';

describe('Affichage de la page Logout', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'), false);
    cy.logout();
  };

  it('Vérifier le texte affiché', () => {
    setupTest();
    cy.contains('Analyses et diagnostics').should('exist');
    cy.contains('Le Centre québécois de génomique clinique offre une plateforme clinique de séquençage à haut débit pour le diagnostic moléculaire des patients québécois en partenariat avec les huit laboratoires du Réseau de diagnostic moléculaire du Québec.').should('exist');
    cy.contains('Connexion').should('exist');
    cy.contains('EN').should('exist');
  });

  it('Vérifier les images des partenaires', () => {
    setupTest();
    cy.get('[class*="Landing_logoRow"]').eq(0).find('svg').its('length').should('eq', 4);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('svg').its('length').should('eq', 2);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('img').its('length').should('eq', 2);
    cy.get('[class*="Landing_sssLogoContainer"] svg').its('length').should('eq', 1);
  });
});
