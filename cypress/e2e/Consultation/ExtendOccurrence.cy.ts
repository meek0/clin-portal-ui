/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '0286826d-f20f-4a43-a17c-d196460bf834');

  cy.get('[data-row-key="9ea37b2966662962908b94b1898dc0a9ac4e9645"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
});

describe('Ligne extensible d\'une occurrence', () => {
  it('Vérifier les informations affichées - En-tête', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr10:g.113623545C>T').should('exist');
    cy.get('[class="ant-card-head-title"]').find('svg[class*="anticon"]').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(0).contains('Ouvrir IGV').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(1).contains('Télécharger le rapport').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('UCSC').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('LitVAR').should('exist');
  });

  it('Vérifier les informations affichées - Section Zygosité', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('Hétérozygote').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('Hét. composé').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('NRAP').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('3').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Hét. composé potentiel').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('NRAP').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('4').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(3).contains('Transmission').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(3).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(4).contains('Origine parentale').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).contains('Mère').should('exist');
  });

  it('Vérifier les informations affichées - Section Famille', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(1).contains('Famille').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Génotype Père').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).find('path[d*=M3]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).find('path[d*=M8]').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('0/0').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('détails').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Génotype Mère').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).find('path[d*=M8]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).find('path[d*=M3]').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('0/1').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('détails').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
  });

  it('Vérifier les informations affichées - Section Métriques', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(2).contains('Métriques').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.27').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).contains('124').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).contains('246').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(4).contains('Qualité du génotype').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(4).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(4).contains('48').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(5).contains('Filtre (Dragen)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(5).contains('PASS').should('exist');
  });
 
  it('Valider les liens disponibles - Hét. composé', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('3').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');
    cy.contains('4 Résultats').should('exist');
  });
 
  it('Valider les liens disponibles - Hét. composé potentiel', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('4').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.wait('@getPOSTgraphql2');
    cy.contains('4 Résultats').should('exist');
  });
  
  it('Vérifier les informations affichées des métriques de séquençage parental', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('détails').clickAndWait({force: true});

    cy.get('[class="ant-modal-title"]').contains('Métriques de séquençage parental').should('exist');

    cy.get('[class="ant-modal-body"] [class="ant-descriptions-title"]').eq(0).contains('Mère').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.27').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('117').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('223').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(3).contains('Ratio allélique ALT / (ALT+REF)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(3).contains('0.52').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(4).contains('Qualité du génotype').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).contains('48').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(5).contains('Filtre (Dragen)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(5).contains('PASS').should('exist');

    cy.get('[class="ant-modal-body"] [class="ant-descriptions-title"]').eq(1).contains('Père').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.27').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('0').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).contains('144').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(3).contains('Ratio allélique ALT / (ALT+REF)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(3).contains('0.00').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(4).contains('Qualité du génotype').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(4).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(4).contains('87').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(5).contains('Filtre (Dragen)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(5).contains('PASS').should('exist');
  });
});