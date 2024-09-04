/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - IGV à partir du tableau', () => {
  beforeEach(() => {
    cy.get('[data-cy="igvModalCb_chr10:g.1096268T>C"]').clickAndWait({force: true});
    cy.contains('Alignement et variant').should('exist');
  });

  it('Vérifier les informations affichées [CLIN-3112]', () => {
    cy.get('[class="igv-track-label"]').eq(0).contains('Refseq Genes').should('exist');
    cy.get('[class="igv-track-label"]').eq(1).contains('HyperExome hg38').should('exist');
    cy.get('[class="igv-track-label"]').eq(2).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(3).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(4).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(5).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(6).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(7).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(8).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(9).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(10).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(11).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(12).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(13).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(14).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(15).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(16).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(17).should('not.exist');
    cy.contains('ERROR').should('not.exist');
  });

  it('Valider les fonctionnalités [CLIN-3144]', () => {
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});

describe('Page des variants d\'un patient - IGV à partir du tiroir', () => {
  beforeEach(() => {
    cy.get('[data-cy="drawerCb_chr10:g.1096268T>C"]').clickAndWait({force: true});
    cy.get('div[class*="ant-drawer-open"] button[class="ant-btn ant-btn-primary"]').clickAndWait({force: true});
    cy.contains('Alignement et variant').should('exist');
  });

  it('Vérifier les informations affichées [CLIN-3112]', () => {
    cy.get('[class="igv-track-label"]').eq(0).contains('Refseq Genes').should('exist');
    cy.get('[class="igv-track-label"]').eq(1).contains('HyperExome hg38').should('exist');
    cy.get('[class="igv-track-label"]').eq(2).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(3).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(4).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(5).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(6).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleProbId} proband`).should('exist');
    cy.get('[class="igv-track-label"]').eq(7).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(8).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(9).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(10).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(11).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleMthId} mother`, {matchCase: false}).should('exist');
    cy.get('[class="igv-track-label"]').eq(12).contains(`CNVs: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(13).contains(`Reads: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(14).contains(`Seg: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(15).contains(`Baf: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(16).contains(`Roh: ${epCHUSJ_ldmCHUSJ.sampleFthId} father`).should('exist');
    cy.get('[class="igv-track-label"]').eq(17).should('exist');
    cy.contains('ERROR').should('not.exist');
  });

  it('Valider les fonctionnalités [CLIN-3144]', () => {
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});
