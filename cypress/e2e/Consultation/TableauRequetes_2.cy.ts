/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
  cy.checkValueFacet('Statut des prescriptions', 'active');
  cy.checkValueFacet('Analyse', 'HYPM');

  cy.get('div[id*="tab-requests"]').clickAndWait({force: true});
  cy.resetColumns(1);

  cy.showColumn('Modifiée le', 1);
  cy.showColumn('EP', 1);
  cy.showColumn('Statut clinique', 1);
  cy.showColumn('Lot', 1);
  cy.showColumn('Prénatal', 1);
  cy.showColumn('Dossier', 1);
  cy.showColumn('Requérant', 1);

  cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 17, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 17, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Échantillon', () => {
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('CAPNGS-B2020', 3, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('GM200573', 3, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Priorité', () => {
    cy.sortTableAndIntercept('Priorité', 3, 1);
    cy.validateTableFirstRow('Routine', 4, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Priorité', 3, 1);
    cy.validateTableFirstRow('Routine', 4, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 5, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 5, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4), 6, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('HYPM', 8, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('MYOC', 8, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 17, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Parenté', () => {
    cy.sortTableAndIntercept('Parenté', 3, 1);
    cy.validateTableFirstRow('Cas-index', 10, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Parenté', 3, 1);
    cy.validateTableFirstRow('Cas-index', 10, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Bioinfo', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 11, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 11, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUS', 12, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUSJ', 12, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CHUS', 13, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CUSM', 13, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Statut clinique', () => {
    cy.sortTableAndIntercept('Statut clinique', 3, 1);
    cy.validateTableFirstRow('Atteint', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut clinique', 3, 1);
    cy.validateTableFirstRow('Atteint', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Lot', () => {
    cy.sortTableAndIntercept('Lot', 3, 1);
    cy.validateTableFirstRow('1_data_to_import', 15, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Lot', 3, 1);
    cy.validateTableFirstRow('1_data_to_import', 15, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Dossier', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 18, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 18, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 17, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.validatePaging(/10\d{1}/, 1, 1);
  });
});
  