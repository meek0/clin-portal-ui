/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitBioinformaticsAnalysisPage(presc_SOMATIC.bioAnalProbId);
});

describe('Page d\'une analyse bioinformatique (somatic) - Valider les panneaux masquables', () => {
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
