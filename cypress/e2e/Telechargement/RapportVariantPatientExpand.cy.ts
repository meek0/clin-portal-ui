/// <reference types="cypress"/>
import { data } from '../../pom/shared/Data';
import { Replacement } from '../../pom/shared/Types';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  cy.get(`[data-row-key="${data.variantGermline.dataRowKey}"] button[class*="ant-table-row-expand-icon"]`).clickAndWait({force: true});
  cy.get('[class="ant-card-head-title"] button[class*="ant-btn-default"]').eq(0).clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Télécharger le rapport d\'un variant d\'un patient de la ligne extensible', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${epCHUSJ_ldmCHUSJ.patientProbId}_${epCHUSJ_ldmCHUSJ.requestProbId}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{sampleProbId}}', value: epCHUSJ_ldmCHUSJ.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatient.json', replacements);
  });
});
