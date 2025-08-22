/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - IGV à partir du tableau', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
    cy.get('[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
    cy.get('[class="ant-card-head-title"] button[class*="ant-btn-default"]').eq(1).clickAndWait({force: true});
    cy.contains('Alignement et variant').should('exist');
  };

  it('Vérifier les informations affichées [CLIN-3105]', () => {
    setupTest();
    cy.get('[class="igv-track-label"]').eq(0).contains('Refseq Genes').should('exist');
    cy.get('[class="igv-track-label"]').eq(1).contains('HyperExome hg38').should('exist');
    cy.get('[class="igv-track-label"]').eq(2).contains(`CNVs: ${presc_PAIRED.sampleProbId.TEBA} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(3).contains(`CNVs: ${presc_PAIRED.sampleProbId.GEBA} normal sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(4).contains(`Reads: ${presc_PAIRED.sampleProbId.TEBA} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(5).contains(`Reads: ${presc_PAIRED.sampleProbId.GEBA} normal sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(6).should('not.exist');
    cy.contains('ERROR').should('not.exist');
  });

  it('Valider les fonctionnalités', () => {
    setupTest();
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});
