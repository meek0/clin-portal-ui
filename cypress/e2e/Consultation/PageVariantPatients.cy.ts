/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;
let epCHUS_ldmCHUS: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  epCHUS_ldmCHUS = Cypress.env('globalData').presc_EP_CHUS_LDM_CHUS;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantEntityPage('19-54221872-C-T', 3);
  cy.get('div[id*="rc-tabs-0-tab-patients"]').clickAndWait({force: true});
});

describe('Page d\'un variant (onglet Patients) - Vérifier les informations affichées', () => {
  it('Graphiques', () => {
    cy.get('[data-cy="PieChart_Gender"]').contains('Sexe').should('exist');
    cy.get('[data-cy="PieChart_Gender"] path[opacity="1"]').eq(0).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/(Indéterminé|Masculin|Féminin)/).should('exist');
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/^(1|42|41|40)$/).should('exist');
    cy.get('[data-cy="PieChart_Gender"] path[opacity="1"]').eq(1).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/(Indéterminé|Masculin|Féminin)/).should('exist');
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/^(1|42|41|40)$/).should('exist');
    cy.get('[data-cy="PieChart_Gender"] path[opacity="1"]').eq(2).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/(Indéterminé|Masculin|Féminin)/).should('exist');
    cy.get('[data-cy="PieChart_Gender"] div[style*="pointer-events"]').contains(/^(1|42|41|40)$/).should('exist');

    cy.get('[data-cy="PieChart_Code"]').contains('Analyse').should('exist');
    cy.get('[data-cy="PieChart_Code"] path[opacity="1"]').eq(0).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/(RGDI|MYOC|EXTUM|HYPM)/).should('exist');
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/^(24|24|1|34)$/).should('exist');

    cy.get('[data-cy="PieChart_Code"] path[opacity="1"]').eq(1).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/(RGDI|MYOC|EXTUM|HYPM)/).should('exist');
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/^(24|24|1|34)$/).should('exist');

    cy.get('[data-cy="PieChart_Code"] path[opacity="1"]').eq(2).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/(RGDI|MYOC|EXTUM|HYPM)/).should('exist');
    cy.get('[data-cy="PieChart_Code"] div[style*="pointer-events"]').contains(/^(24|24|1|34)$/).should('exist');

    cy.get('[data-cy="PieChart_Filter"]').contains(/^Filtre$/).should('exist');
    cy.get('[data-cy="PieChart_Filter"] path[opacity="1"]').eq(0).trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[data-cy="PieChart_Filter"] div[style*="pointer-events"]').contains('PASS').should('exist');
    cy.get('[data-cy="PieChart_Filter"] div[style*="pointer-events"]').contains(/^82$/).should('exist');
  });
  
  it('Tableau', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
    
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('RGDI').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('Masculin').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('Atteint').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('PASS').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('3.14').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"] [data-cy="ad_alt"]').contains('61').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"] [data-cy="ad_total"]').contains('91').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('0.67').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientProbId+'"]').contains('30').should('exist');

    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('RGDI').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('Féminin').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('Non atteint').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('PASS').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('3.14').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"] [data-cy="ad_alt"]').contains('27').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"] [data-cy="ad_total"]').contains('54').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('0.50').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientMthId+'"]').contains('16').should('exist');

    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('RGDI').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('Masculin').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('Non atteint').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('PASS').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('3.14').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"] [data-cy="ad_alt"]').contains('71').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"] [data-cy="ad_total"]').contains('72').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('0.99').should('exist');
    cy.get('tr[data-row-key*="'+epCHUSJ_ldmCHUSJ.patientFthId+'"]').contains('196').should('exist');
  });
});

describe('Page d\'un variant (onglet Patients) - Valider les liens disponibles', () => {
  it('Lien de la requête', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

    cy.clickAndIntercept('[data-cy="PrescriptionLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]','POST', '**/$graphql*', 1);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
});

describe('Page d\'un variant (onglet Patients) - Valider les fonctionnalités du tableau', () => {
  it('Tri Analyse', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/(HYPM|EXTUM)/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('RGDI').should('exist');
  });

  it('Tri QP', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QP').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/(-|3.14)/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QP').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('3.14').should('exist');
  });

  it('Tri ALT', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_alt"]').contains(/^18$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_alt"]').contains(/^152$/).should('exist');
  });

  it('Tri ALT+REF', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT+REF').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_total"]').contains(/^18$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT+REF').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).find('[data-cy="ad_total"]').contains(/^152$/).should('exist');
  });

  it('Tri ALT/(ALT+REF)', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT/(ALT+REF)').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('0.47').should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT/(ALT+REF)').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('1.00').should('exist');
  });

  it('Tri QG', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QG').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/^(-|7)$/).should('exist');
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('QG').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains('440').should('exist');
  });

  it('Tri multiple', () => {
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('Analyse').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] thead[class="ant-table-thead"]').contains('ALT').clickAndWait({force: true});
    cy.get('[data-cy="VariantPatient_GridCard"] tr[class*="ant-table-row"]').eq(0).contains(/^23$/).should('exist');
  });

  it('Filtre Analyse', () => {
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

describe.skip('Footer position on scroll', () => {
  it('should keep the footer at the bottom when scrolling', () => {
    cy.wait(5000);

    cy.get('footer[id="footer"]').eq(1).then(($footer) => {
      cy.log('footer.top: '+$footer[0].getBoundingClientRect().top);
      cy.log('footer.bottom: '+$footer[0].getBoundingClientRect().bottom);
    });

//    cy.get('[class*="simplebar-vertical"]').eq(2).debug().scrollTo('bottom');
    cy.get('[class*="ScrollContentWithFooter"]').eq(3).scrollTo('bottom', { ensureScrollable: false });
    cy.screenshot();
    cy.wait(1000);

    cy.get('footer[id="footer"]').eq(1).then(($footer) => {
      cy.log('footer.top: '+$footer[0].getBoundingClientRect().top);
      cy.log('footer.bottom: '+$footer[0].getBoundingClientRect().bottom);
    });
/*
    cy.window().then(win => {
      win.scrollTo(0, 1330);
    });
    cy.wait(1000);

    cy.get('footer[id="footer"]').eq(1).then(($footer) => {
      cy.log('footer.top: '+$footer[0].getBoundingClientRect().top);
      cy.log('footer.bottom: '+$footer[0].getBoundingClientRect().bottom);
    });*/
/*
    cy.get('[class*="shared_containerWrapper"]').invoke('css', 'overflow', 'visible').then(() => {
      cy.get('[class*="shared_containerWrapper"]').should('be.visible').then(($container) => {
        cy.log('container.top: '+$container[0].getBoundingClientRect().height);
//        cy.log('container.bottom: '+$container[0].getBoundingClientRect().bottom);
      });
    });*/
  });
});