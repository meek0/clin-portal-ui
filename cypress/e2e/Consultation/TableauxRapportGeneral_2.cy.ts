/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page du rapport général d\'un patient - Valider les liens disponibles', () => {
  it('Lien Couverture de l\'exome', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(1).find('a[href]').clickAndWait({force: true});
    cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Couverture génique').should('exist');
  });

  it('Lien CNV total', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(5).find('a[href]').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
    cy.validateTableResultsCount('196');
  });
});
