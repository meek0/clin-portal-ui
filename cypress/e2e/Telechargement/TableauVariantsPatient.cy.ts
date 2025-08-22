/// <reference types="cypress"/>
import { data } from '../../pom/shared/Data';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

describe('Page des variants d\'un patient - Exporter un variant en TSV', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    VariantsPatientTable.actions.checkRow(data.variantGermline);
    VariantsPatientTable.actions.clickDownloadButton();
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveExportedFileContent(data.variantGermline);
  });
});
