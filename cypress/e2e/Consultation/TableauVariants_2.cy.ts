/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { getStartPosition } from '../../pom/shared/Utils';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage(SharedFilters.variant.chrX_123403094);
  VariantsTable.actions.showAllColumns();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Valider les liens disponibles Lien Variant', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[data-cy="Summary_Start"]').contains(getStartPosition(data.variantGermline)).should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'rqdm');
    VariantsTable.validations.shouldShowResultsCount(data.variantGermline.rqdmP);
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'cmc');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'tier');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'acmg_franklin');
  });
});
  