/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;
let epCHUS_ldmCHUS: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  epCHUS_ldmCHUS = Cypress.env('globalData').presc_EP_CHUS_LDM_CHUS;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantEntityPage('19-54221872-C-T', 3);
  cy.get('div[id*="rc-tabs-0-tab-patients"]').clickAndWait({force: true});
});

describe('Page d\'un variant (onglet Patients) - Valider les liens disponibles', () => {
  it('Lien de la requête', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.clickAndIntercept('[data-cy="PrescriptionLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]','POST', '**/$graphql*', 1);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
});
