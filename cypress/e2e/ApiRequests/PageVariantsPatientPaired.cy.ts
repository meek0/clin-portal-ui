/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Valider la requête graphql', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  };

  it('Facette standard', () => {
    setupTest();
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query getVariantCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_SNV"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientPairedFacetteStandard.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_PAIRED.patientProbId)
        .replace('{{prescriptionId}}', presc_PAIRED.prescriptionId.TEBA)
      );

      expect(interception.request.body).to.deep.equal(updatedFixture);
      });
    });
  });

  it('Facette numérique ou No Data', () => {
    setupTest();
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
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
                          value: [presc_PAIRED.patientProbId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.analysis_service_request_id',
                          value: [presc_PAIRED.prescriptionId.TEBA]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.bioinfo_analysis_code',
                          value: ['TNEBA']
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
                          value: [presc_PAIRED.patientProbId]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.analysis_service_request_id',
                          value: [presc_PAIRED.prescriptionId.TEBA]
                        },
                        op: 'in'
                      },
                      {
                        content: {
                          field: 'donors.bioinfo_analysis_code',
                          value: ['TNEBA']
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
    setupTest();
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('VariantInformation')) {
        req.alias = 'postGraphqlFirst';
      }
    });

    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

    cy.wait('@postGraphqlFirst').then((interception) => {
      cy.fixture('RequestBody/VariantsPatientPairedPagingFirst.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_PAIRED.patientProbId)
        .replace('{{prescriptionId}}', presc_PAIRED.prescriptionId.TEBA)
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
      cy.fixture('RequestBody/VariantsPatientPairedPagingNext.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_PAIRED.patientProbId)
        .replace('{{prescriptionId}}', presc_PAIRED.prescriptionId.TEBA)
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
      cy.fixture('RequestBody/VariantsPatientPairedPagingPrev.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', presc_PAIRED.patientProbId)
        .replace('{{prescriptionId}}', presc_PAIRED.prescriptionId.TEBA)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });
  });
});
