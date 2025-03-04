/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  cy.get('[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
  cy.get('[class="ant-card-head-title"] button[class*="ant-btn-default"]').eq(1).clickAndWait({force: true});
  cy.contains('Alignement et variant').should('exist');
});

describe('Page des variants d\'un patient (somatic) - IGV à partir du tableau', () => {
  it('Vérifier les informations affichées [CLIN-3105]', () => {
    cy.get('[class="igv-track-label"]').eq(0).contains('Refseq Genes').should('exist');
    cy.get('[class="igv-track-label"]').eq(1).contains('HyperExome hg38').should('exist');
    cy.get('[class="igv-track-label"]').eq(2).contains(`CNVs: ${presc_SOMATIC.sampleProbId} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(3).contains(`Reads: ${presc_SOMATIC.sampleProbId} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(4).should('not.exist');
    cy.contains('ERROR').should('not.exist');
  });

  it('Valider les fonctionnalités', () => {
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});
