/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un variant (onglet Patients) - Valider les liens disponibles', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantEntityPage('19-54221872-C-T', 3);
    cy.get('div[id*="rc-tabs-0-tab-patients"]').clickAndWait({force: true});
  };

  it('Lien de la requête', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.clickAndIntercept('[data-cy="PrescriptionLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]','POST', '**/$graphql*', 1);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
});
