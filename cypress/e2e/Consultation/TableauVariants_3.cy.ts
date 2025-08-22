/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

describe('Page des variants - Consultation du tableau', () => {
  const setupTest = () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
    VariantsTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('variant');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('gene');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('gnomad');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('gnomad_alt');
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM G', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('rqdm');
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('cmc');
  });

  it('Valider les fonctionnalités du tableau - Tri Hotspot', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('hotspot');
  });

  it('Valider les fonctionnalités du tableau - Tri Exo. (var)', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('exomiser_var');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('tier');
  });

  it('Valider les fonctionnalités du tableau - Tri Max Exo.', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('max_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('acmg_franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('acmg_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    VariantsTable.actions.sortColumn('gnomad');
    VariantsTable.actions.sortColumn('variant', false/*needIntercept*/);
    VariantsTable.actions.sortColumn('variant');
    VariantsTable.validations.shouldHaveFirstRowValue(/^(chrY:g.9906510G>C|chrY:g.9908200A>C)$/, 'variant');
  });
});
  