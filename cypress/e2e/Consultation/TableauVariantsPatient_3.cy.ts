/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsPatientTable } from '../../pom/pages/VariantsPatientTable';

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
    VariantsPatientTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('variant');
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('gene');
  });

  it('Valider les fonctionnalités du tableau - Tri Fra.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri Exo.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('acmg_franklin');
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('acmg_exomiser');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('gnomad');
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('gnomad_alt');
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM G', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('rqdm');
  });

  it('Valider les fonctionnalités du tableau - Tri QG', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('qg');
  });

  it('Valider les fonctionnalités du tableau - Tri # CNVs', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('cnvs');
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('zygosity');
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('transmission');
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('qp');
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('op');
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('a');
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('a_r');
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('a_ratio');
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('filter');
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('cmc');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    setupTest();
    VariantsPatientTable.validations.shouldSortColumn('tier');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    VariantsPatientTable.actions.sortColumn('gnomad');
    VariantsPatientTable.actions.sortColumn('gnomad');
    VariantsPatientTable.actions.sortColumn('gene');
    VariantsPatientTable.actions.sortColumn('gene');
    VariantsPatientTable.validations.shouldHaveFirstRowValue(/(ZNHIT1|ZNF875|ZNF83)/, 'gene');
  });
});
