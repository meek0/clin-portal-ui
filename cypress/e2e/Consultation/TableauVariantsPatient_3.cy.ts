/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  VariantsPatientTable.actions.showAllColumns();
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    VariantsPatientTable.validations.shouldSortColumn('variant');
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    VariantsPatientTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    VariantsPatientTable.validations.shouldSortColumn('gene');
  });

  it('Valider les fonctionnalités du tableau - Tri Fra.', () => {
    VariantsPatientTable.validations.shouldSortColumn('franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri Exo.', () => {
    VariantsPatientTable.validations.shouldSortColumn('exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    VariantsPatientTable.validations.shouldSortColumn('acmg_franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    VariantsPatientTable.validations.shouldSortColumn('acmg_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    VariantsPatientTable.validations.shouldSortColumn('gnomad');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    VariantsPatientTable.validations.shouldSortColumn('gnomad_alt');
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM G', () => {
    VariantsPatientTable.validations.shouldSortColumn('rqdm');
  });

  it('Valider les fonctionnalités du tableau - Tri QG', () => {
    VariantsPatientTable.validations.shouldSortColumn('qg');
  });

  it('Valider les fonctionnalités du tableau - Tri # CNVs', () => {
    VariantsPatientTable.validations.shouldSortColumn('cnvs');
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    VariantsPatientTable.validations.shouldSortColumn('zygosity');
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    VariantsPatientTable.validations.shouldSortColumn('transmission');
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    VariantsPatientTable.validations.shouldSortColumn('qp');
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    VariantsPatientTable.validations.shouldSortColumn('op');
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    VariantsPatientTable.validations.shouldSortColumn('a');
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    VariantsPatientTable.validations.shouldSortColumn('a_r');
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    VariantsPatientTable.validations.shouldSortColumn('a_ratio');
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    VariantsPatientTable.validations.shouldSortColumn('filter');
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    VariantsPatientTable.validations.shouldSortColumn('cmc');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    VariantsPatientTable.validations.shouldSortColumn('tier');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    VariantsPatientTable.actions.sortColumn('gnomad');
    VariantsPatientTable.actions.sortColumn('gnomad');
    VariantsPatientTable.actions.sortColumn('gene');
    VariantsPatientTable.actions.sortColumn('gene');
    VariantsPatientTable.validations.shouldHaveFirstRowValue(/(ZNHIT1|ZNF875|ZNF83)/, 'gene');
  });
});
