/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
  cy.checkValueFacet('Analyse', 'RGDI');

  cy.get('div[id*="tab-requests"]').clickAndWait({force: true});
  cy.resetColumns(1);

  cy.showColumn('Modifiée le', 1);
  cy.showColumn('Statut clinique', 1);
  cy.showColumn('Lot', 1);
  cy.showColumn('Prénatal', 1);
  cy.showColumn('Dossier', 1);
  cy.showColumn('Requérant', 1);

  cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 1, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 2, 'Complétée');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.requestProbId, 2, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 3, epCHUSJ_ldmCHUSJ.stampDate.substring(0, 7));
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 4, /^\d{4}-\d{2}-\d{2}$/);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 5, epCHUSJ_ldmCHUSJ.sampleProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 6, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 7, 'RGDI');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 8, epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 9, 'Cas-index');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 10, 'G');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.requestProbId, 10, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 11, 'LDM-CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 12, 'CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 13, 'Atteint');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 14, '1_data_to_import');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 15, 'Non');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 16, epCHUSJ_ldmCHUSJ.mrnProb);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 17, '-');
  });

  it('Valider les liens disponibles Lien Requête', () => {
    cy.clickAndIntercept('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.requestProbId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 0);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Valider les liens disponibles Lien Prescription', () => {
    cy.clickAndIntercept('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.requestProbId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 1);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
});
