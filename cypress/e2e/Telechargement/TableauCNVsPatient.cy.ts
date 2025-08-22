/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

describe('Page des CNVs d\'un patient - Exporter les CNVs en TSV', () => {
  const { strDate } = getDateTime();
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 2);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('CNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauCNVsPatient.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauCNVsPatient.json');
  });
});
