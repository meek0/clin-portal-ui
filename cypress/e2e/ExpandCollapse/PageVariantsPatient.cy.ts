/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Valider les liens disponibles', () => {
  it('Panel RQDM - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Panel RQDM');
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Gène - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Gène');
  });

  it('Fréquence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Fréquence');
  });

  it('Pathogénicité - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Pathogénicité');
  });

  it('Occurrence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Occurrence');
  });
});
