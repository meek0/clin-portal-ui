/// <reference types="cypress"/>
import '../../support/commands';
let epCHUSJ_ldmCHUSJ: any;
let epCUSM_ldmCHUSJ: any;
let epCUSM_ldmCUSM: any;
let epCHUS_ldmCHUS: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  epCUSM_ldmCHUSJ = Cypress.env('globalData').presc_EP_CUSM_LDM_CHUSJ;
  epCUSM_ldmCUSM = Cypress.env('globalData').presc_EP_CUSM_LDM_CUSM;
  epCHUS_ldmCHUS = Cypress.env('globalData').presc_EP_CHUS_LDM_CHUS;
});

describe('Accès des utilisateurs', () => {
  it('Résident (CHUSJ) [CLIN-4950]', () => {
    cy.login(Cypress.env('username_R_CHUSJ'), Cypress.env('password').replace('$', '!'));
    cy.visit('/');

    // Le bouton Panels est visible
    cy.contains('Panels').should('exist');

    // Les prescriptions uniquement du EP CHUSJ sont visibles
    cy.visitPrescriptionsPage();
    cy.contains(/^CHUSJ$/).should('exist');
    cy.contains(/^CUSM$/).should('not.exist');
    cy.contains(/^CHUS$/).should('not.exist');

    // Accéder à la page de tous les variants est impossible
    cy.visit('/snv/exploration');
    cy.contains('403').should('exist');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Fichiers').eq(1).should('not.exist');
    // Accéder aux variants d'un patient du CHUSJ est impossible
    cy.visit(`/prescription/entity/${epCHUSJ_ldmCHUSJ.prescriptionId}?variantSection=snv#variants`);
    cy.contains('403').should('exist');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit(`/prescription/entity/${epCUSM_ldmCHUSJ.prescriptionId}`);
    cy.contains('403').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit(`/prescription/entity/${epCUSM_ldmCHUSJ.prescriptionId}?variantSection=snv#variants`);
    cy.contains('403').should('exist');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit(`/prescription/entity/${epCUSM_ldmCUSM.prescriptionId}`);
    cy.contains('403').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit(`/prescription/entity/${epCUSM_ldmCUSM.prescriptionId}?variantSection=snv#variants`);
    cy.contains('403').should('exist');

    // Accéder à la page Prescription d'un patient du CHUS est impossible
    cy.visit(`/prescription/entity/${epCHUS_ldmCHUS.prescriptionId}`);
    cy.contains('403').should('exist');
    // Accéder aux variants d'un patient du CHUS est impossible
    cy.visit(`/prescription/entity/${epCHUS_ldmCHUS.prescriptionId}?variantSection=snv#variants`);
    cy.contains('403').should('exist');

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist');
    cy.contains('Fhir').should('not.exist');
  });
});
