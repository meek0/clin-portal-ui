/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.get('div[role="tabpanel"] tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] [type="checkbox"]').check({force: true});
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
