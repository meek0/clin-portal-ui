/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { getStartPosition } from '../../pom/shared/Utils';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    VariantsPatientTable.actions.showAllColumns();
  };

  it('Valider les liens disponibles Lien Variant', () => {
    setupTest();
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[data-cy="Summary_Start"]').contains(getStartPosition(data.variantGermline)).should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    setupTest();
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsPatientTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'acmg_franklin');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    setupTest();
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'rqdm');
    VariantsPatientTable.validations.shouldShowResultsCount(data.variantGermline.rqdmP);
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'cmc');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    setupTest();
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'tier');
  });
});
