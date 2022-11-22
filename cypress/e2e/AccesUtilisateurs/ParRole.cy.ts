/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));
const epCUSM_ldmCHUSJ  = JSON.parse(Cypress.env('presc_EP_CUSM_LDM_CHUSJ'));
const epCUSM_ldmCUSM   = JSON.parse(Cypress.env('presc_EP_CUSM_LDM_CUSM'));
const epCHUS_ldmCHUS   = JSON.parse(Cypress.env('presc_EP_CHUS_LDM_CHUS'));

describe('Accès des utilisateurs', () => {

  it('Docteur et généticien (CHUSJ, CUSM, CHUS)', () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Généticien (CHUSJ, CUSM, CHUS)', () => {
    cy.login(Cypress.env('username_G_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains('LDM-CHUS').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Docteur et généticien (CHUSJ)', () => {
    cy.login(Cypress.env('username_DG_CHUSJ'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Généticien (CHUSJ)', () => {
    cy.login(Cypress.env('username_G_CHUSJ'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Généticien (CUSM)', () => {
    cy.login(Cypress.env('username_G_CUSM'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Docteur et généticien (CHUS)', () => {
    cy.login(Cypress.env('username_DG_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });

  it('Généticien (CHUS)', () => {
    cy.login(Cypress.env('username_G_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    cy.logout;
  });
});
