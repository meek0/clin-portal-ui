/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../pom/shared/Utils';


describe('Page des variants d\'un patient (somatic) - Exporter un variant en TSV', () => {
  const { strDate } = getDateTime();
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

    cy.get('div[role="tabpanel"] tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] [type="checkbox"]').check({force: true});
    cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauVariantsPatientSomatic.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauVariantsPatientSomatic.json');
  });
});
