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
