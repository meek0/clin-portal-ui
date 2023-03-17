/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
  cy.visit('/snv/exploration/patient/'+epCHUSJ_ldmCHUSJ.patientProbId+'/'+epCHUSJ_ldmCHUSJ.prescriptionId+'?sharedFilterId=0286826d-f20f-4a43-a17c-d196460bf834');
  cy.wait('@getPOSTgraphql', {timeout: 5000});
  cy.wait('@getPOSTgraphql', {timeout: 5000});
  cy.wait('@getPOSTgraphql', {timeout: 5000});

  cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="60132f04673360caa585bc6cce30b5b19084c26c"]').find('td[class*="ant-table-cell-fix-left"]').eq(1).find('svg[class="anticon"]').first().click({force: true});
});

afterEach(() => {
  cy.logout();
});

describe('Tiroir d\'une occurrence', () => {
  it('Vérifier les informations affichées [CLIN-1785]', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('chr11:g.1185062_1185063insAC').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('HET').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('MUC5AC').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('( 1 )').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('MUC5AC').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('( 3 )').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('path[d*=C1]').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('path[d*=V1]').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains('0/1').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).find('path[d*=V1]').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).find('path[d*=C1]').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains('0/0').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(3).contains('Mother').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.02').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(1).contains('38').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(2).contains('407').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.09').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(4).contains('22').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');
  });
 
  it('Valider les liens disponibles [CLIN-1784]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('26').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.contains('1 Résultats').should('exist', {timeout: 20*1000});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('55').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.contains('3 Résultats').should('exist', {timeout: 20*1000});
  });
  
  it('Vérifier les informations affichées des métriques de séquençage parental', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('button[class*="ant-btn-sm"]').click({force: true});

    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.02').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains('72').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(2).contains('366').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.20').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(4).contains('12').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');

    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.02').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('6').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('414').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.01').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(4).contains('99').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');
  });
});