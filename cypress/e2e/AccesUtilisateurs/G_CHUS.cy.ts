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
  it('Généticien (CHUS)', () => {
    cy.login(Cypress.env('username_G_CHUS'), Cypress.env('password').replace('$', '!'));
    cy.visit('/');

    // Le bouton Panels est visible
    cy.contains('Panels').should('exist');

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="flag"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="message"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="thunderbolt"]').should('not.exist');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="flag"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="message"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="thunderbolt"]').should('not.exist');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="flag"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="message"]').should('not.exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="thunderbolt"]').should('not.exist');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="flag"]').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="message"]').should('exist');
    cy.get('thead[class="ant-table-thead"]').find('[data-icon="thunderbolt"]').should('exist');

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist');
    cy.contains('Fhir').should('not.exist');
  });
});
