/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitBioinformaticsAnalysisPage(epCHUSJ_ldmCHUSJ.bioAnalProbId);
});

describe('Page d\'une analyse bioinformatique - Valider les panneaux masquables', () => {
  it('Panneau Échantillons', () => {
    cy.get('[data-cy="SamplesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="SamplesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="SamplesCard_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="SamplesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="SamplesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Fichiers de données', () => {
    cy.get('[data-cy="FilesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="FilesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FilesCard_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="FilesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="FilesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Analyses connexes', () => {
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
