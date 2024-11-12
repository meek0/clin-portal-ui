/// <reference types="cypress"/>
import { Replacement } from '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Télécharger le rapport d\'un variant d\'un patient (paired)', () => {
  beforeEach(() => {
    cy.get('[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
    cy.get('[class="ant-card-head-title"] button[class*="ant-btn-default"]').eq(0).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_PAIRED.patientProbId}_${presc_PAIRED.requestProbId.TEBA}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_PAIRED.requestProbId.TEBA },
      { placeholder: '{{sampleProbId}}', value: presc_PAIRED.sampleProbId.TEBA },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientPaired.json', replacements);
  });
});
