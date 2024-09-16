/// <reference types="cypress"/>
import '../../support/commands';

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

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de requête du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestProbId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de dossier du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnProb, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnProb.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de patient du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientProbId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleProbId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de requête de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestMthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de dossier de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnMth.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de patient de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientMthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro d\'échantillon de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleMthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de requête du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestFthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de dossier du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnFth, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnFth.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de patient du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientFthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro d\'échantillon du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleFthId.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });

  it('Par numéro de lot', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', '2_data_to_import', 'POST', '**/graphql', 4*'2_data_to_import'.length);

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('MYOC').should('exist');
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

    cy.get('body').contains('Requêtes (3)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro de requête du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestProbId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro de dossier du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnProb, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnProb.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro de patient du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientProbId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleProbId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleProbId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro de requête de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestMthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro de dossier de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnMth.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro de patient de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientMthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro d\'échantillon de la mère', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleMthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleMthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro de requête du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.requestFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.requestFthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro de dossier du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.mrnFth, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.mrnFth.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro de patient du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.patientFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.patientFthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro d\'échantillon du père', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', epCHUSJ_ldmCHUSJ.sampleFthId, 'POST', '**/graphql', 4*epCHUSJ_ldmCHUSJ.sampleFthId.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro de lot', () => {
    cy.typeAndIntercept('[data-cy="PrescriptionsSearch"]', '2_data_to_import', 'POST', '**/graphql', 4*'2_data_to_import'.length);

    cy.get('body').contains('Requêtes (1)').should('exist');
    cy.get('body').contains('MYOC').should('exist');
  });
});
