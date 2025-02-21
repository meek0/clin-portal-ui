/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page du rapport général d\'un patient - Vérifier les informations affichées', () => {
  it('Panneau Sommaire', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(0).contains('Sexe').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(0).contains('Masculin').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(1).contains('Couverture de l\'exome > 15X').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(1).contains('97.7').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(2).contains('Contamination').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(2).contains(/^0$/).should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(3).contains('Uniformité de la couverture < 40%').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(3).find('[class*="QualityControlSummary_moderateImpact"]').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(3).contains('80.86').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(4).contains('Couverture moy. de l\'exome').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(4).contains('180.82').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(5).contains('# CNV total').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(5).contains('196').should('exist');
  });
});
 
it('Valider la fonctionnalité du radio bouton Général-Couverture génique', () => {
  cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Général').should('exist');

  cy.get('[id*="panel-#qc"]').contains('Couverture génique').clickAndWait({force: true});
  cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Couverture génique').should('exist');
});
