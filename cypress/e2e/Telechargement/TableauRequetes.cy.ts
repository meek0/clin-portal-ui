/// <reference types="cypress"/>
import { Replacement } from '../../pom/shared/Types';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';


describe('Page des prescriptions et requêtes - Exporter les requêtes en TSV', () => {
  const { strDate } = getDateTime();
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitPrescriptionsPage();
    cy.get('div[id*="tab-requests"]').clickAndWait({force: true});

    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 3, 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('RQ_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauRequetes.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    const replacements: Replacement[] = [
      { placeholder: '{{requestId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{patientId}}', value: epCHUSJ_ldmCHUSJ.patientProbId },
      { placeholder: '{{stampDate}}', value: epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4) },
      { placeholder: '{{prescriptionId}}', value: epCHUSJ_ldmCHUSJ.prescriptionId },
    ];
    cy.validateFileContent('ExportTableauRequetes.json', replacements);
  });
});
