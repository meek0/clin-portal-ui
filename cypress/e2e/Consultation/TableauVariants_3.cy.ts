/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage(SharedFilters.variant.emptyQuery);
  VariantsTable.actions.showAllColumns();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    VariantsTable.validations.shouldSortColumn('variant');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    VariantsTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    VariantsTable.validations.shouldSortColumn('gene');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    VariantsTable.validations.shouldSortColumn('gnomad');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    VariantsTable.validations.shouldSortColumn('gnomad_alt');
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM G', () => {
    VariantsTable.validations.shouldSortColumn('rqdm');
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    VariantsTable.validations.shouldSortColumn('cmc');
  });

  it('Valider les fonctionnalités du tableau - Tri Hotspot', () => {
    VariantsTable.validations.shouldSortColumn('hotspot');
  });

  it('Valider les fonctionnalités du tableau - Tri Exo. (var)', () => {
    VariantsTable.validations.shouldSortColumn('exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    VariantsTable.validations.shouldSortColumn('tier');
  });

  it('Valider les fonctionnalités du tableau - Tri Max Exo.', () => {
    VariantsTable.validations.shouldSortColumn('max_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    VariantsTable.validations.shouldSortColumn('acmg_franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    VariantsTable.validations.shouldSortColumn('acmg_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    VariantsTable.actions.sortColumn('gnomad');
    VariantsTable.actions.sortColumn('variant', false/*needIntercept*/);
    VariantsTable.actions.sortColumn('variant');
    VariantsTable.validations.shouldHaveFirstRowValue(/^(chrY:g.9906510G>C|chrY:g.9908200A>C)$/, 'variant');
  });
});
  