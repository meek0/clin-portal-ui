/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page du rapport général d\'un patient - Consultation des tableaux de métriques', () => {
  it('Dragen Capture Coverage Metrics - Vérifier les informations affichées', () => {
    cy.fixture('ExportTableauDragenCaptureCoverageMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i].replace(/\s+/g, ' ').trim()).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });

  it('Dragen Mapping Metrics - Vérifier les informations affichées', () => {
    cy.get('[data-node-key="DRAGEN_mapping_metrics"]').clickAndWait({force: true});
    cy.fixture('ExportTableauDragenMappingMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i]).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });

  it('Picard Collect Hs Metrics - Vérifier les informations affichées', () => {
    cy.get('[data-node-key="Picard_CollectHsMetrics"]').clickAndWait({force: true});
    cy.fixture('ExportTableauPicardCollectHsMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i]).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });
});
