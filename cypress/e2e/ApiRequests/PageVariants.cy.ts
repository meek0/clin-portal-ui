/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Valider la requête graphql', () => {
  it('Facette standard', () => {
    cy.visitVariantsPage();
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query getVariantCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_SNV"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/VariantsFacetteStandard.json').then((expectedRequestBody) => {
        expect(interception.request.body).to.deep.equal(expectedRequestBody);
      });
    });
  });

  it('Facette numérique ou No Data', () => {
    cy.visitVariantsPage();
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query getVariantCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Position');
    cy.get('[data-cy="InputNumber_Min_Position"]').type('1', {force: true});
    cy.get('[data-cy="InputNumber_Max_Position"]').type('2', {force: true});
    cy.get('[data-cy="Checkbox_NoData_Position"]').check({force: true});
    cy.get('[data-cy="Button_Apply_Position"]').clickAndWait({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/VariantsFacetteNumerique.json').then((expectedRequestBody) => {
        expect(interception.request.body).to.deep.equal(expectedRequestBody);
      });
    });
  });

  it('Pagination', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlFirst';
      }
    });

    cy.visitVariantsPage();

    cy.wait('@postGraphqlFirst').then((interception) => {
      cy.fixture('RequestBody/VariantsPagingFirst.json').then((expectedRequestBody) => {
        expect(interception.request.body.variables).to.deep.equal(expectedRequestBody.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlNext';
      }
    });

    cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').click({force: true});

    cy.wait('@postGraphqlNext').then((interception) => {
      cy.fixture('RequestBody/VariantsPagingNext.json').then((expectedRequestBody) => {
        expect(interception.request.body.variables).to.deep.equal(expectedRequestBody.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlPrev';
      }
    });

    cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').click({force: true});

    cy.wait('@postGraphqlPrev').then((interception) => {
      cy.fixture('RequestBody/VariantsPagingPrev.json').then((expectedRequestBody) => {
        expect(interception.request.body.variables).to.deep.equal(expectedRequestBody.variables);
      });
    });
  });
});
