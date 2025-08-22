/// <reference types="cypress"/>
import '../../support/commands';

describe('Page de la couverture génique d\'un patient (somatic) - Consultation du tableau', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCQPatientPage(presc_SOMATIC.prescriptionId);
    cy.get('[data-cy="RadioButton_CouvertureGenique"]').clickAndWait({force: true});
    cy.resetColumns(0);
    cy.sortTableAndIntercept('15x', 1);
    cy.sortTableAndIntercept('15x', 1);
  };

  it('Vérifier les informations affichées', () => {
    setupTest();
    cy.get('tr[data-row-key]').eq(6).find('td').eq(2).contains('RPL41').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(3).contains(/^69$/).should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(4).contains('81.16').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(5).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(6).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(7).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(8).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(9).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(10).contains('14.49%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(11).contains('< 1%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(12).contains('< 1%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(13).contains('< 1%').should('exist');

    cy.get('[data-cy="AverageCoverage"]').contains('378.89').should('exist');
  });
 
  it('Valider la fonctionnalité du radio bouton Général-Couverture génique', () => {
    setupTest();
    cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Couverture génique').should('exist');
  
    cy.get('[id*="panel-#qc"]').contains('Général').clickAndWait({force: true});
    cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Général').should('exist');
  });
});
