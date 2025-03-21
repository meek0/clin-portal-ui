/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage();
});

describe('Page des variants - Valider la requête graphql', () => {
  it('Facette standard', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query getVariantCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_SNV"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        query: `\n  query getVariantCount($sqon: JSON) {\n    Variants {\n      hits(filters: $sqon, first: 0) {\n        total\n      }\n    }\n  }\n`,
        variables: {
          sqon: {
            content: [
              {
                content: {
                  field: 'variant_class',
                  index: 'Variants',
                  value: ['SNV'],
                },
                op: 'in',
              },
            ],
            op: 'and',
          },
        },
      });
    });
  });

  it('Facette numérique ou No Data', () => {
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
      expect(interception.request.body).to.deep.equal({
        query: `\n  query getVariantCount($sqon: JSON) {\n    Variants {\n      hits(filters: $sqon, first: 0) {\n        total\n      }\n    }\n  }\n`,
        variables: {
          sqon: {
            content: [
              {
                content: [
                  {
                    content: {
                      field: 'start',
                      index: 'Variants',
                      value: [1, 2],
                    },
                    op: 'between',
                  },
                  {
                    content: {
                      field: 'start',
                      index: 'Variants',
                      value: ['__missing__'],
                    },
                    op: 'in',
                  },
                ],
                op: 'or',
              },
            ],
            op: 'and',
          },
        },
      });
    });
  });
});
