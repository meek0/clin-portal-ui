/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { getStartPosition } from '../../pom/shared/Utils';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  VariantsPatientTable.actions.showAllColumns();
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  it('Valider les liens disponibles Lien Variant', () => {
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[data-cy="Summary_Start"]').contains(getStartPosition(data.variantGermline)).should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsPatientTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'acmg_franklin');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    VariantsPatientTable.actions.clickTableCellLink(data.variantGermline, 'rqdm');
    VariantsPatientTable.validations.shouldShowResultsCount(data.variantGermline.rqdmP);
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'cmc');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    VariantsPatientTable.validations.shouldHaveTableCellLink(data.variantGermline, 'tier');
  });
});
