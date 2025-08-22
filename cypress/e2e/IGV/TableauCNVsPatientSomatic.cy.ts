/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient (somatic) - IGV à partir du tableau', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=7159fa28-876c-4a46-9a0d-c1e7b88ba5e2');
    cy.get('[class*="variantColumns_actionButton"]').click({force: true});
    cy.get('[data-menu-id*="igv"]').should('be.visible').clickAndWait();
    cy.contains('Alignement et variant').should('exist');
  };

  it('Vérifier les informations affichées [CLIN-3105]', () => {
    setupTest();
    cy.get('[class="igv-track-label"]').eq(0).contains('Refseq Genes').should('exist');
    cy.get('[class="igv-track-label"]').eq(1).contains('HyperExome hg38').should('exist');
    cy.get('[class="igv-track-label"]').eq(2).contains(`CNVs: ${presc_SOMATIC.sampleProbId} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(3).contains(`Reads: ${presc_SOMATIC.sampleProbId} tumor sample`).should('exist');
    cy.get('[class="igv-track-label"]').eq(4).should('not.exist');
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
