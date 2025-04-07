/// <reference types="cypress"/>
import { Replacement } from '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  cy.get('[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
  cy.get('[class="ant-card-head-title"] button[class*="ant-btn-default"]').eq(0).clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Télécharger le rapport d\'un variant d\'un patient (somatic)', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_SOMATIC.patientProbId}_${presc_SOMATIC.requestProbId}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_SOMATIC.requestProbId },
      { placeholder: '{{sampleProbId}}', value: presc_SOMATIC.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientSomatic.json', replacements);
  });
});
