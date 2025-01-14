/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page du rapport général d\'un patient - Vérifier les informations affichées', () => {
  it('Panneau Sommaire', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(0).contains('Sexe').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(0).contains('Masculin').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(1).contains('Couverture de l\'exome > 15X').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(1).contains('97.7').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(2).contains('Contamination').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(2).contains(/^0$/).should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(3).contains('Uniformité de la couverture < 40%').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(3).find('[class*="QualityControlSummary_moderateImpact"]').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(3).contains('80.86').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(4).contains('Couverture moy. de l\'exome').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(4).contains('180.82').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-label"]').eq(5).contains('# CNV total').should('exist');
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(5).contains('196').should('exist');
  });
});
 
it('Valider la fonctionnalité du radio bouton Général-Couverture génique', () => {
  cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Général').should('exist');

  cy.get('[id*="panel-#qc"]').contains('Couverture génique').clickAndWait({force: true});
  cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Couverture génique').should('exist');
});

describe('Page du rapport général d\'un patient - Valider les liens disponibles', () => {
  it('Lien Couverture de l\'exome', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(1).find('a[href]').clickAndWait({force: true});
    cy.get('[id*="panel-#qc"] [class*="ant-radio-button-wrapper-checked"]').contains('Couverture génique').should('exist');
  });

  it('Lien CNV total', () => {
    cy.get('[class*="QualityControlSummary"] [class="ant-descriptions-item-content"]').eq(5).find('a[href]').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
    cy.validateTableResultsCount('196');
  });
});

describe('Page du rapport général d\'un patient - Valider les panneaux masquables', () => {
  it('Panneau Sommaire', () => {
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="_CollapsePanel"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-cy="_CollapsePanel"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});

describe('Page du rapport général d\'un patient - Consultation des tableaux de métriques', () => {
  it('Dragen Capture Coverage Metrics - Vérifier les informations affichées', () => {
    cy.fixture('ExportTableauDragenCaptureCoverageMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i].replace(/\s+/g, ' ').trim()).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });

  it('Dragen Mapping Metrics - Vérifier les informations affichées', () => {
    cy.get('[data-node-key="DRAGEN_mapping_metrics"]').clickAndWait({force: true});
    cy.fixture('ExportTableauDragenMappingMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i]).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });

  it('Picard Collect Hs Metrics - Vérifier les informations affichées', () => {
    cy.get('[data-node-key="Picard_CollectHsMetrics"]').clickAndWait({force: true});
    cy.fixture('ExportTableauPicardCollectHsMetrics.json').then((expectedData) => {
      for (let i = 0; i < expectedData.headers.length; i++) {
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('th').contains(expectedData.headers[i]).should('exist');
        cy.get('[class*="ant-card-bordered"] tr[class="ant-descriptions-row"]').eq(i).find('td').contains(expectedData.contentGermline[i]).should('exist');
      }
    });
  });
});
