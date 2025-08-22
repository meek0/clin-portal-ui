/// <reference types="cypress"/>
import { oneMinute } from '../../pom/shared/Utils';

describe('Télécharger le rapport général', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    cy.get('[class*="QC_cardWrapper"] button[class*="ant-btn-default"]').clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier [CLIN-4632]', () => {
    setupTest();
    cy.validateFileName('16774.QC_report.json');
  });

  it('Valider le contenu du fichier [CLIN-4632]', () => {
    setupTest();
    cy.fixture('DownloadRapportGeneral.json').then((expectedData) => {
      cy.readFile(`${Cypress.config('downloadsFolder')}/16774.QC_report.json`).then((fileContent) => {
        assert.deepEqual(JSON.stringify(fileContent), JSON.stringify(expectedData));
      });
    });
  });
});
