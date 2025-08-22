/// <reference types="cypress"/>
import { data } from '../../pom/shared/Data';
import { Replacement } from '../../pom/shared/Types';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

describe('Télécharger le rapport d\'un variant d\'un patient', () => {
  const { strDate } = getDateTime();
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    cy.get(`div[role="tabpanel"] tr[data-row-key="${data.variantGermline.dataRowKey}"] [type="checkbox"]`).check({force: true});
    cy.get('div[id="content"] svg[data-icon="download"]').eq(0).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName(`${epCHUSJ_ldmCHUSJ.patientProbId}_${epCHUSJ_ldmCHUSJ.requestProbId}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{sampleProbId}}', value: epCHUSJ_ldmCHUSJ.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatient.json', replacements);
  });
});
