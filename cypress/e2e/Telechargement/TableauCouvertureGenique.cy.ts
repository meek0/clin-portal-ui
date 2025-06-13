/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').clickAndWait({force: true});
  cy.sortTableAndIntercept('15x', 1);
  cy.sortTableAndIntercept('15x', 1);

  cy.get('div[role="tabpanel"] tr[data-row-key]').eq(6).find('[type="checkbox"]').check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force:true});
  cy.waitUntilFile(oneMinute);
});

describe('Page de la couverture génique d\'un patient - Exporter les statistiques en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('GC_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauCouvertureGenique.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauCouvertureGenique.json');
  });
});
