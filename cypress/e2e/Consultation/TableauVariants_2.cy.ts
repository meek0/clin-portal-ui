/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { getStartPosition } from '../../pom/shared/Utils';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

describe('Page des variants - Consultation du tableau', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage(SharedFilters.variant.chrX_123403094);
    VariantsTable.actions.showAllColumns();
  };

  it('Valider les liens disponibles Lien Variant', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[data-cy="Summary_Start"]').contains(getStartPosition(data.variantGermline)).should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'rqdm');
    VariantsTable.validations.shouldShowResultsCount(data.variantGermline.rqdmP);
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'cmc');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'tier');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'acmg_franklin');
  });
});
  