/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient (somatic) - Valider la requête graphql', () => {
  it('Facette standard', () => {
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query getVariantCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_SNV"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientSomaticFacetteStandard.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_SOMATIC.patientProbId)
        .replace('{{prescriptionId}}', presc_SOMATIC.prescriptionId)
      );

      expect(interception.request.body).to.deep.equal(updatedFixture);
      });
    });
  });

  it('Facette numérique ou No Data', () => {
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
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
                    content: [
                      {
                        content: {
                          field: 'start',
                          index: 'Variants',
                          value: [1,2]
                        },
                        op: 'between'
                      },
                      {
                        content: {
                          field: 'donors.patient_id',
                          value: [presc_SOMATIC.patientProbId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.analysis_service_request_id',
                          value: [presc_SOMATIC.prescriptionId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.bioinfo_analysis_code',
                          value: ['TEBA']
                          },
                        op: 'in'
                      }
                    ],
                    op: 'and',
                    pivot: 'donors'
                  },
                  {
                    content: [
                      {
                        content: {
                          field: 'start',
                          index: 'Variants',
                          value: ['__missing__']
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.patient_id',
                          value: [presc_SOMATIC.patientProbId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.analysis_service_request_id',
                          value: [presc_SOMATIC.prescriptionId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.bioinfo_analysis_code',
                          value: ['TEBA']
                          },
                        op: 'in'
                      }
                    ],
                    op: 'and',
                    pivot: 'donors'
                  }
                ],
                op: 'or'
              }
            ],
            op: 'and'
          }
        },
      });
    });
  });

  it('Pagination', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlFirst';
      }
    });

    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

    cy.wait('@postGraphqlFirst').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientSomaticPagingFirst.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_SOMATIC.patientProbId)
        .replace('{{prescriptionId}}', presc_SOMATIC.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlNext';
      }
    });

    cy.get('div[class*="Pagination"] button[type="button"]').contains('Suivant').click({force: true});

    cy.wait('@postGraphqlNext').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientSomaticPagingNext.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_SOMATIC.patientProbId)
        .replace('{{prescriptionId}}', presc_SOMATIC.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlPrev';
      }
    });

    cy.get('div[class*="Pagination"] button[type="button"]').contains('Précédent').click({force: true});

    cy.wait('@postGraphqlPrev').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientSomaticPagingPrev.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_SOMATIC.patientProbId)
        .replace('{{prescriptionId}}', presc_SOMATIC.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });
  });
});
