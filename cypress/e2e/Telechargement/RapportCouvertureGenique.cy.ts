/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
  cy.get('div[role="tabpanel"]').find('tr[data-row-key]').eq(0).should('exist');

  cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').click({force: true});
  cy.waitUntilFile(60*1000);
});

describe('Télécharger le rapport de la couverture génique', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('16774.coverage_by_gene.GENCODE_CODING_CANONICAL.csv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadRapportCouvertureGenique.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('DownloadRapportCouvertureGenique.json');
  });
});
