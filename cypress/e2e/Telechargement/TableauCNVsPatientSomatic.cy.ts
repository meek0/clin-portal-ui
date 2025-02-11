/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=2ff2f3d3-24a5-49ef-ac6c-233c1f01c211');

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

  it('Valider le contenu du fichier [CLIN-3886]', () => {
    cy.validateFileContent('ExportTableauCNVsPatientSomatic.json');
  });
});
