/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Valider la requête graphql', () => {
  it('Recherche prescription', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('PrescriptionsInformation')) {
        req.alias = 'postGraphql';
      }
    });

    cy.get('[data-cy="PrescriptionsSearch"]').type('t', {force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/RecherchePrescription.json').then((expectedRequestBody) => {
        expect(interception.request.body).to.deep.equal(expectedRequestBody);
      });
    });
  });

  it('Recherche requête', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('SequencingsInformation')) {
        req.alias = 'postGraphql';
      }
    });

    cy.get('[data-cy="PrescriptionsSearch"]').type('t', {force: true});

    cy.wait('@postGraphql').then((interception) => {
        cy.fixture('RequestBody/RechercheRequete.json').then((expectedRequestBody) => {
          expect(interception.request.body).to.deep.equal(expectedRequestBody);
        });
    });
  });
});
