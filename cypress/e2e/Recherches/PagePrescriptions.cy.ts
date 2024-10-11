/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et requêtes - Rechercher des prescriptions', () => {

  beforeEach(() => {
    cy.visitPrescriptionsPage();
    cy.checkValueFacet('Statut des prescriptions', 'active');
  });

  it('Par numéro de prescription', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.prescriptionId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.prescriptionId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de requête du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestProbId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de dossier du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnProb, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnProb.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de patient du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientProbId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleProbId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de requête de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestMthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de dossier de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnMth.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de patient de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientMthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro d\'échantillon de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleMthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de requête du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestFthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de dossier du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnFth, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnFth.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de patient du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientFthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro d\'échantillon du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleFthId.length);

    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.prescriptionId, 2, true/*hasCheckbox*/);
  });

  it('Par numéro de lot', () => {
    cy.get('[data-cy="PrescriptionsSearch"]').type('2_data_to_import', {force: true});
    cy.waitWhileSpin(oneMinute);

    cy.wait(10*1000);
    cy.get('[data-node-key="prescriptions"]').contains('Prescriptions (1)').should('exist');
    cy.validateTableFirstRow('MYOC', 7, true/*hasCheckbox*/);
  });
});

describe('Page des prescriptions et requêtes - Rechercher des requêtes', () => {

  beforeEach(() => {
    cy.visitPrescriptionsPage();
    cy.checkValueFacet('Statut des prescriptions', 'active');
    cy.get('div[id*="tab-requests"]').clickAndWait({force: true});

    cy.resetColumns(1);
  });

  it('Par numéro de prescription', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.prescriptionId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.prescriptionId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (3)', {timeout: oneMinute}).should('exist');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 1, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestMthId, 1, epCHUSJ_ldmCHUSJ.requestMthId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestFthId, 1, epCHUSJ_ldmCHUSJ.requestFthId);
  });

  it('Par numéro de requête du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestProbId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de dossier du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnProb, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnProb.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de patient du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientProbId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleProbId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de requête de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestMthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestMthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de dossier de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnMth.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestMthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de patient de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientMthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestMthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro d\'échantillon de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleMthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestMthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de requête du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestFthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de dossier du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnFth, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnFth.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de patient du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientFthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro d\'échantillon du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleFthId.length);

    cy.get('[data-node-key="requests"]').contains('Requêtes (1)', {timeout: oneMinute}).should('exist');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 1, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Par numéro de lot', () => {
    cy.get('[data-cy="PrescriptionsSearch"]').type('2_data_to_import', {force: true});
    cy.waitWhileSpin(oneMinute);

    cy.wait(10*1000);
    cy.get('[data-node-key="requests"]').contains('Requêtes (1)').should('exist');
    cy.validateTableFirstRow('MYOC', 6, true/*hasCheckbox*/, '[id="rc-tabs-0-panel-requests"]');
  });
});
