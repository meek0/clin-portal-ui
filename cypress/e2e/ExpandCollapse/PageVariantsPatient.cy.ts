/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient - Valider les liens disponibles', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Panel RQDM - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Panel RQDM');
  });

  it('Variant - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Variant');
  });

  it('Gène - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Gène');
  });

  it('Fréquence - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Fréquence');
  });

  it('Pathogénicité - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Pathogénicité');
  });

  it('Occurrence - Expand all/Collapse all', () => {
    setupTest();
    cy.validateExpandCollapse('Occurrence');
  });
});
