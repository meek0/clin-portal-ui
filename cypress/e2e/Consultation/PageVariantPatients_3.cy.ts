/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un variant (onglet Patients) - Valider les fonctionnalités du tableau', () => {
  let epCHUS_ldmCHUS: any;
  const setupTest = () => {
    epCHUS_ldmCHUS = Cypress.env('globalData').presc_EP_CHUS_LDM_CHUS;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantEntityPage('19-54221872-C-T', 3);
    cy.get('div[id*="rc-tabs-0-tab-patients"]').clickAndWait({force: true});
  };

  it('Tri Analyse', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/(HYPM|EXTUM)/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('RGDI').should('exist');
  });

  it('Tri QP', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QP').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/(-|3.14)/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QP').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('3.14').should('exist');
  });

  it('Tri ALT', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_alt"]').contains(/^18$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_alt"]').contains(/^152$/).should('exist');
  });

  it('Tri ALT+REF', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT+REF').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_total"]').contains(/^18$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT+REF').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_total"]').contains(/^152$/).should('exist');
  });

  it('Tri ALT/(ALT+REF)', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT/(ALT+REF)').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('0.47').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT/(ALT+REF)').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('1.00').should('exist');
  });

  it('Tri QG', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QG').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/^(-|7)$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QG').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('440').should('exist');
  });

  it('Tri multiple', () => {
    setupTest();
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/^23$/).should('exist');
  });

  it('Filtre Analyse', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(0).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] li[data-menu-id*="RGDI"] [type="checkbox"]').check({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"]').contains('RGDI').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('not.exist');
    cy.validateTableResultsCount('24 Résultats');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(0).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-link"]').last().clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('exist');
    cy.validateTableResultsCount('24 Résultats', false);
  });

  it('Filtre Sexe', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(1).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] li[data-menu-id*="unknown"] [type="checkbox"]').check({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"]').contains('Indéterminé').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('not.exist');
    cy.validateTableResultsCount(/^1 Résultat$/);
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(1).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-link"]').last().clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('exist');
    cy.validateTableResultsCount(/^1 Résultat$/, false);
  });

  it('Filtre Statut', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(2).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] li[data-menu-id*="not_affected"] [type="checkbox"]').check({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"]').contains('Non atteint').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('not.exist');
    cy.validateTableResultsCount('7 Résultats');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(2).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-link"]').last().clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('exist');
    cy.validateTableResultsCount('7 Résultats', false);
  });

  it('Filtre Filtre', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
    
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(3).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] li[data-menu-id*="PASS"] [type="checkbox"]').check({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"]').contains('PASS').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('exist');
    cy.validateTableResultsCount(/8(2|3) Résultats/);
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"] span[class*="ant-dropdown-trigger"]').eq(3).clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-link"]').last().clickAndWait({force: true});
    cy.get('div[class="ant-table-filter-dropdown"] button[class*="ant-btn-primary"]').last().clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[data-row-key*="'+epCHUS_ldmCHUS.patientProbId+'"]').should('exist');
    cy.validateTableResultsCount(/8(2|3) Résultats/);
  });

  it('Pagination', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
    cy.validateTableResultsCount(/8(2|3) Résultats/);

    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.validateTableResultsCount(/Résultats 1 - 20 de 8(2|3)/);

    cy.get('[class*="ant-pagination-item-2"]').clickAndWait({force: true});
    cy.validateTableResultsCount(/Résultats 21 - 40 de 8(2|3)/);

    cy.get('[class*="anticon-right"]').clickAndWait({force: true});
    cy.validateTableResultsCount(/Résultats 41 - 60 de 8(2|3)/);

    cy.get('[class*="anticon-left"]').clickAndWait({force: true});
    cy.validateTableResultsCount(/Résultats 21 - 40 de 8(2|3)/);
  });
});
