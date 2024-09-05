/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Page des variants d\'un patient (paired) - IGV à partir du tableau', () => {
  beforeEach(() => {
    cy.get('[data-cy="igvModalCb_chr10:g.17617338A>C"]').clickAndWait({force: true});
    cy.contains('Alignement et variant').should('exist');
  });

  it('Vérifier les informations affichées [CLIN-3105]', () => {
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
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});

describe('Page des variants d\'un patient (paired) - IGV à partir du tiroir', () => {
  beforeEach(() => {
    cy.get('[data-cy="drawerCb_chr10:g.17617338A>C"]').clickAndWait({force: true});
    cy.get('div[class*="ant-drawer-open"] button[class="ant-btn ant-btn-primary"]').clickAndWait({force: true});
    cy.contains('Alignement et variant').should('exist');
  });

  it('Vérifier les informations affichées [CLIN-3105]', () => {
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
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});
