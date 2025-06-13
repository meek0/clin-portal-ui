/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  VariantsPatientTable.actions.showAllColumns();
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    VariantsPatientTable.validations.shouldShowTableContent(data.variantGermline);
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, 'd3eefb82-edcc-42f1-a4e6-28808bd06f34');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV-CNV', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('CNV').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
  });
});
  