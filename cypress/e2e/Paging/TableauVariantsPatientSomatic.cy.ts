/// <reference types="cypress"/>
import '../../support/commands';

describe('Tableau des variants d\'un patient (somatic) - Valider avec des mocks', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  };

  it('Pagination', () => {
    setupTest();
    cy.fixture('ResponseBody/VariantsPatientSomaticPagingFirst.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('VariantInformation')) {
          req.alias = 'postGraphql';
          req.reply(mockResponseBody);
        }
      });

      cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
      cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
      cy.wait('@postGraphql');

      cy.validateTableResultsCount('Résultats 1 - 10 de '+mockResponseBody.data.Variants.hits.total);
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').parent('button').should('be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').parent('button').should('not.be.disabled');
    });

    cy.fixture('ResponseBody/VariantsPatientSomaticPagingNext1.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('VariantInformation')) {
          req.alias = 'postGraphqlNext1';
          req.reply(mockResponseBody);
        }
      });

      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').click({force: true});
      cy.wait('@postGraphqlNext1');

      cy.validateTableResultsCount('Résultats 11 - 20 de '+mockResponseBody.data.Variants.hits.total);
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').parent('button').should('not.be.disabled');
    });

    cy.fixture('ResponseBody/VariantsPatientSomaticPagingNext2.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('VariantInformation')) {
          req.alias = 'postGraphqlNext2';
          req.reply(mockResponseBody);
        }
      });

      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').click({force: true});
      cy.wait('@postGraphqlNext2');

      cy.validateTableResultsCount('Résultats 21 - 30 de '+mockResponseBody.data.Variants.hits.total);
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').parent('button').should('not.be.disabled');
    });

    cy.fixture('ResponseBody/VariantsPatientSomaticPagingPrev.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('VariantInformation')) {
          req.alias = 'postGraphqlPrev';
          req.reply(mockResponseBody);
        }
      });

      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').click({force: true});
      cy.wait('@postGraphqlPrev');

      cy.validateTableResultsCount('Résultats 11 - 20 de '+mockResponseBody.data.Variants.hits.total);
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').parent('button').should('not.be.disabled');
    });

    cy.fixture('ResponseBody/VariantsPatientSomaticPagingFirst.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('VariantInformation')) {
          req.alias = 'postGraphqlFirst';
          req.reply(mockResponseBody);
        }
      });

      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').click({force: true});
      cy.wait('@postGraphqlFirst');

      cy.validateTableResultsCount('Résultats 1 - 10 de '+mockResponseBody.data.Variants.hits.total);
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Début').parent('button').should('be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
      cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').parent('button').should('not.be.disabled');
    });
  });
});
