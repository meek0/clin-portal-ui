/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

describe('Page des variants d\'un patient (paired) - Exporter un variant en TSV', () => {
  const { strDate } = getDateTime();
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

    cy.get('div[role="tabpanel"] tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] [type="checkbox"]').check({force: true});
    cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauVariantsPatientPaired.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauVariantsPatientPaired.json');
  });
});
