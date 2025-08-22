/// <reference types="cypress"/>
import { Replacement } from '../../pom/shared/Types';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

describe('Télécharger le rapport d\'un variant d\'un patient (paired)', () => {
  const { strDate } = getDateTime();
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
    cy.get('div[role="tabpanel"] tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] [type="checkbox"]').check({force: true});
    cy.get('div[id="content"] svg[data-icon="download"]').eq(0).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName(`${presc_PAIRED.patientProbId}_${presc_PAIRED.requestProbId.TEBA}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_PAIRED.requestProbId.TEBA },
      { placeholder: '{{sampleProbId}}', value: presc_PAIRED.sampleProbId.TEBA },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientPaired.json', replacements);
  });
});
