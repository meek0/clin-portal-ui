/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

  cy.get('[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
});

describe('Ligne extensible d\'une occurrence', () => {
  it('Vérifier les informations affichées - En-tête', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr10:g.17617338A>C').should('exist');
    cy.get('[class="ant-card-head-title"]').find('svg[class*="anticon"]').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(0).contains('Télécharger rapport').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(1).contains('Ouvrir IGV').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('UCSC').should('exist');

    cy.get('[data-row-key="8f11e237271fa6d6c5b0cab036012fe68fba0e7f"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
    cy.get('[class="ant-card-head-title"]').contains('LitVAR').should('exist');
  });

  it('Vérifier les informations affichées - Section Zygosité', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('Hétérozygote').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').contains('Hét. composé').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').contains('Hét. composé potentiel').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').contains('Transmission').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').contains('Origine parentale').should('not.exist');
  });

  it('Vérifier les informations affichées - Section Famille', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').contains('Famille').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').contains('Génotype Père').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').contains('Génotype Mère').should('not.exist');
  });

  it('Vérifier les informations affichées - Section Métriques', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(1).contains('Métriques').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('9').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).contains('136').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(3).contains('Qualité somatique').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(3).contains('14.62').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(4).contains('Filtre (Dragen)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(4).contains('Weak Evidence').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').contains('Qualité du génotype').should('not.exist');
  });
});