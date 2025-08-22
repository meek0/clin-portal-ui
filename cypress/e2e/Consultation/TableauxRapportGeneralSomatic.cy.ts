/// <reference types="cypress"/>
import '../../support/commands';

describe('Page du rapport général d\'un patient (somatic) - Consultation des tableaux', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCQPatientPage(presc_SOMATIC.prescriptionId);
  };

  it('Dragen Capture Coverage Metrics - Vérifier les informations affichées', () => {
    setupTest();
    cy.fixture('ExportTableauDragenCaptureCoverageMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i].replace(/\s+/g, ' ').trim()).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentSomatic[i]).should('exist');
      }
    });
  });

  it('Dragen Mapping Metrics - Vérifier les informations affichées', () => {
    setupTest();
    cy.get('[data-node-key="DRAGEN_mapping_metrics"]').clickAndWait({force: true});
    cy.fixture('ExportTableauDragenMappingMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i]).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentSomatic[i]).should('exist');
      }
    });
  });

  it('Picard Collect Hs Metrics - Vérifier les informations affichées', () => {
    setupTest();
    cy.get('[data-node-key="Picard_CollectHsMetrics"]').clickAndWait({force: true});
    cy.get('[class="ant-card-body"]').contains('Aucune donnée').should('exist');
  });
});
