/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

describe('Page des variants d\'un patient - Colonnes du tableau', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  };

  it('Valider l\'affichage par défaut', () => {
    setupTest();
    VariantsPatientTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    setupTest();
    VariantsPatientTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    setupTest();
    VariantsPatientTable.validations.shouldShowSortableColumns();
  });
  
  it('Valider le tooltip', () => {
    setupTest();
    VariantsPatientTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    setupTest();
    VariantsPatientTable.validations.shouldDisplayColumn('type');
    VariantsPatientTable.actions.hideColumn('type');
    VariantsPatientTable.validations.shouldNotDisplayColumn('type');
  });

  it('Afficher une colonne masquée', () => {
    setupTest();
    VariantsPatientTable.validations.shouldNotDisplayColumn('tier');
    VariantsPatientTable.actions.showColumn('tier');
    VariantsPatientTable.validations.shouldDisplayColumn('tier');
  });
});
