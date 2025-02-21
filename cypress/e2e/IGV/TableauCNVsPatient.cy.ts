/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=5747ace3-449a-46bf-9ae9-08842b88bcb5');
  cy.get('tr svg[class="anticon"]').eq(0).clickAndWait({force: true});
  cy.contains('Alignement et variant').should('exist');
});

describe('Page des CNVs d\'un patient - IGV à partir du tableau', () => {
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

  it('Valider les fonctionnalités', () => {
    cy.get('[class="igv-windowsize-panel-container"]').should('have.attr', 'style', 'display: block;');
    cy.get('[class="igv-windowsize-panel-container"]').invoke('text').then((strBeforeZoom) => {
      cy.get('[class*="igv-zoom-widget"] path').eq(0).clickAndWait({force: true});
      cy.get('[class="igv-windowsize-panel-container"]').invoke('text').should('not.equal', strBeforeZoom);
    });
  });
});
