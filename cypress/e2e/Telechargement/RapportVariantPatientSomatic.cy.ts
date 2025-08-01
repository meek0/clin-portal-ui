/// <reference types="cypress"/>
import { Replacement } from '../../pom/shared/Types';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();
let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  cy.get('div[role="tabpanel"] tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] [type="checkbox"]').check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').eq(0).clickAndWait({force: true});
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
