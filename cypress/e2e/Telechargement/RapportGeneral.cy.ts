/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);

  cy.get('[class="ant-card-head"] button[class*="ant-btn-default"]').click({force: true});
  cy.waitUntilFile(60*1000);
});

describe('Télécharger le rapport général', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('16774.QC_report.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.fixture('DownloadRapportGeneral.json').then((expectedData) => {
      cy.readFile(`${Cypress.config('downloadsFolder')}/16774.QC_report.json`).then((fileContent) => {
        expect(JSON.stringify(fileContent)).to.deep.equal(JSON.stringify(expectedData));
      });
    });
  });
});
