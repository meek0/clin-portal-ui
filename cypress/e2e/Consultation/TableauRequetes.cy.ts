/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  beforeEach(() => {  
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

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 1, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 2, 'Complétée');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.requestProbId, 2, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 3, epCHUSJ_ldmCHUSJ.stampDate);
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

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  beforeEach(() => {  
    cy.checkValueFacet('Statut des prescriptions', 'active');
    cy.checkValueFacet('Analyse', 'HYPM');
  
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

  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 2, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 2, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 3, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 3, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 4, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 4, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Échantillon', () => {
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283890', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('HYPM', 7, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('MYOC', 7, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Parenté', () => {
    cy.sortTableAndIntercept('Parenté', 3, 1);
    cy.validateTableFirstRow('Cas-index', 9, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Parenté', 3, 1);
    cy.validateTableFirstRow('Cas-index', 9, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Bioinfo', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 10, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 10, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUS', 11, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUSJ', 11, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CHUS', 12, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CUSM', 12, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Statut clinique', () => {
    cy.sortTableAndIntercept('Statut clinique', 3, 1);
    cy.validateTableFirstRow('Atteint', 13, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut clinique', 3, 1);
    cy.validateTableFirstRow('Atteint', 13, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Lot', () => {
    cy.sortTableAndIntercept('Lot', 3, 1);
    cy.validateTableFirstRow('1_data_to_import', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Lot', 3, 1);
    cy.validateTableFirstRow('1_data_to_import', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 15, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 15, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 16, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Dossier', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 17, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 17, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 16, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.validatePaging(/10\d{1}/, 1, 1);
  });
});
  