/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.get('div[role="tabpanel"] tr[data-row-key="230d341fb95184d399ab5a5a00f5bbc709f92c5f"] [type="checkbox"]').check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Page des CNVs d\'un patient (somatic) - Exporter les CNVs en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('CNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauCNVsPatientSomatic.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauCNVsPatientSomatic.json');
  });
});
