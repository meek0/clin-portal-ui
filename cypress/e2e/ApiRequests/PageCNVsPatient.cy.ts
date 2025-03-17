/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Valider la requête graphql pour les facettes', () => {
  it('Facette standard', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query CnvCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_GAIN"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        query: `\n  query CnvCount($sqon: JSON) {\n    cnv {\n      hits(filters: $sqon, first: 0) {\n        total\n      }\n    }\n  }\n`,
        variables: {
          sqon: {
            content: [
              {
                content: [
                  {
                    content: {
                      field: 'patient_id',
                      value: [epCHUSJ_ldmCHUSJ.patientProbId],
                    },
                    op: 'in',
                  },
                  {
                    content: {
                      field: 'analysis_service_request_id',
                      value: [epCHUSJ_ldmCHUSJ.prescriptionId],
                    },
                    op: 'in',
                  }
                ],
                op: 'and'
              },
              {
                content: [
                  {
                    content: {
                      field: 'type',
                      index: 'cnv',
                      value: ['GAIN']
                    },
                    op: 'in'
                  }
                ],
                op: 'and'
            }
          ],
          op: 'and'
          },
        },
      });
    });
  });

  it('Facette numérique ou No Data', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query CnvCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Longueur du CNV');
    cy.get('[data-cy="InputNumber_Min_Longueur du CNV"]').type('1', {force: true});
    cy.get('[data-cy="Checkbox_NoData_Longueur du CNV"]').check({force: true});
    cy.get('[data-cy="Button_Apply_Longueur du CNV"]').clickAndWait({force: true});

    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        query: `\n  query CnvCount($sqon: JSON) {\n    cnv {\n      hits(filters: $sqon, first: 0) {\n        total\n      }\n    }\n  }\n`,
        variables: {
          sqon: {
            content: [
              {
                content: [
                  {
                    content: {
                      field: 'patient_id',
                      value: [epCHUSJ_ldmCHUSJ.patientProbId]
                    },
                    op: 'in'
                  },
                  {
                    content: {
                      field: 'analysis_service_request_id',
                      value: [epCHUSJ_ldmCHUSJ.prescriptionId]
                    },
                    op: 'in'
                  }
                ],
                op: 'and'
              },
              {
                content: [
                  {
                    content: [
                      {
                        content: {
                          field: 'reflen',
                          index: 'cnv',
                          value: [1]
                        },
                        op: '>='
                      },
                      {
                        content: {
                          field: 'reflen',
                          index: 'cnv',
                          value: ['__missing__']
                        },
                        op: 'in'
                      }
                    ],
                    op: 'or'
                  }
                ],
                op: 'and'
              }
            ],
            op: 'and'
          }
        },
      });
    });
  });
});
