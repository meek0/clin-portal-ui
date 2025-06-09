/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../pom/shared/Utils';

beforeEach(() => {
  cy.visit('/');
  cy.waitWhileSpin(oneMinute);
});

describe('Affichage de la page Landing', () => {
  it('Vérifier le texte affiché', () => {
    cy.contains('Analyses et diagnostics').should('exist');
    cy.contains('Le Centre québécois de génomique clinique offre une plateforme clinique de séquençage à haut débit pour le diagnostic moléculaire des patients québécois en partenariat avec les huit laboratoires du Réseau de diagnostic moléculaire du Québec.').should('exist');
    cy.contains('Connexion').should('exist');
    cy.contains('EN').should('exist');
  });

  it('Vérifier les images des partenaires', () => {
    cy.get('[class*="Landing_logoRow"]').eq(0).find('svg').its('length').should('eq', 4);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('svg').its('length').should('eq', 2);
    cy.get('[class*="Landing_logoRow"]').eq(1).find('img').its('length').should('eq', 2);
    cy.get('[class*="Landing_sssLogoContainer"] svg').its('length').should('eq', 1);
  });
});
