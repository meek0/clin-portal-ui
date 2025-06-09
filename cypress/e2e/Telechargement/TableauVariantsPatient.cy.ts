/// <reference types="cypress"/>
import { data } from '../../pom/shared/Data';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.get(`div[role="tabpanel"] tr[data-row-key="${data.variantGermline.dataRowKey}"] [type="checkbox"]`).check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Page des variants d\'un patient - Exporter un variant en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauVariantsPatient.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauVariantsPatient.json');
  });
});
