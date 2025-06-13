/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des variants d\'un patient - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    VariantsPatientTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    VariantsPatientTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    VariantsPatientTable.validations.shouldShowSortableColumns();
  });
  
  it('Valider le tooltip', () => {
    VariantsPatientTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    VariantsPatientTable.validations.shouldDisplayColumn('type');
    VariantsPatientTable.actions.hideColumn('type');
    VariantsPatientTable.validations.shouldNotDisplayColumn('type');
  });

  it('Afficher une colonne masquée', () => {
    VariantsPatientTable.validations.shouldNotDisplayColumn('tier');
    VariantsPatientTable.actions.showColumn('tier');
    VariantsPatientTable.validations.shouldDisplayColumn('tier');
  });
});
