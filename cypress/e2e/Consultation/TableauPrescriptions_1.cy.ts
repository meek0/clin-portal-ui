/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
  cy.checkValueFacet('Analyse', 'RGDI');

  cy.resetColumns(0);

  cy.showColumn('Modifiée le', 0);
  cy.showColumn('Projet', 0);
  cy.showColumn('Requérant', 0);
  cy.showColumn('Prénatal', 0);
  cy.showColumn('Dossier', 0);
});

describe('Page des prescriptions et requêtes - Consultation du tableau des prescriptions', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 2, epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 3, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 4, 'Routine');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 5, 'Approuvée');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.prescriptionId, 5, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 6, epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4));
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 7, /^\d{4}-\d{2}-\d{2}$/);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 8, 'RGDI');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 9, '-');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 10, 'G');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.prescriptionId, 10, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 11, 'LDM-CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 12, 'CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 13, /(-|PRR000011)/);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 14, 'Non');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 15, epCHUSJ_ldmCHUSJ.mrnProb);
  });

  it('Valider les liens disponibles Lien Prescription', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"] a[href*="prescription"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
});
