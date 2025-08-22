/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../pom/shared/Utils';

describe('Affichage de la page Login', () => {
  const setupTest = () => {
    cy.visit('/');
    cy.waitWhileSpin(oneMinute);
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').should('exist');
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').clickAndWait();
  };

  it('Vérifier le texte affiché', () => {
    setupTest();
    cy.get('[id="social-CQGC"]').clickAndWait();
    cy.waitWhileSpin(oneMinute);

    cy.contains('Courriel').should('exist');
    cy.contains('Mot de passe').should('exist');
    cy.contains('Mot de passe oublié ?').should('exist');
    cy.contains('Soumettre').should('exist');
    cy.contains('Annuler').should('exist');
    cy.contains('EN').should('exist');
  });
});
