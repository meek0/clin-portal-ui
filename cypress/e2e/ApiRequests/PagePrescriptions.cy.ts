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

    cy.get('[data-cy="PrescriptionsSearch"]').type('t');

    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        "operationName": "PrescriptionsInformation",
        "variables": {
            "first": 0,
            "offset": 0,
            "sqon": {
                "content": [
                    {
                        "content": [
                            {
                                "content": {
                                    "field": "prescription_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "patient_mrn",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "patient_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.request_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.prescription_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.sample",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.patient_mrn",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.patient_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.task_runname",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "request_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sample",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            }
                        ],
                        "op": "or"
                    },
                    {
                        "content": [],
                        "op": "and"
                    },
                    {
                        "content": {
                            "field": "status",
                            "value": [
                                "draft"
                            ]
                        },
                        "op": "not-in"
                    }
                ],
                "op": "and"
            },
            "sort": [
                {
                    "field": "created_on",
                    "order": "desc"
                },
                {
                    "field": "_id",
                    "order": "desc"
                }
            ]
        },
        "query": "query PrescriptionsInformation($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {\n  Analyses {\n    hits(\n      filters: $sqon\n      first: $first\n      offset: $offset\n      sort: $sort\n      searchAfter: $searchAfter\n    ) {\n      edges {\n        searchAfter\n        node {\n          id\n          assignments\n          patient_id\n          patient_mrn\n          prescription_id\n          ep\n          created_on\n          timestamp\n          requester\n          prenatal\n          ldm\n          tasks\n          analysis_code\n          status\n          priority\n          sequencing_requests {\n            hits {\n              edges {\n                node {\n                  patient_relationship\n                  patient_disease_status\n                  task_runname\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      total\n      __typename\n    }\n    aggregations(filters: $sqon) {\n      priority {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      analysis_code {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      tasks {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      status {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      sequencing_requests__status {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      ldm {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      ep {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      prenatal {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      sequencing_requests__patient_relationship {\n        buckets {\n          key\n          key_as_string\n          doc_count\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"
    });
    });
  });

  it('Recherche requête', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('SequencingsInformation')) {
        req.alias = 'postGraphql';
      }
    });

    cy.get('[data-cy="PrescriptionsSearch"]').type('t');

    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        "operationName": "SequencingsInformation",
        "variables": {
            "first": 0,
            "offset": 0,
            "sqon": {
                "content": [
                    {
                        "content": [
                            {
                                "content": {
                                    "field": "prescription_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "patient_mrn",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "patient_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.request_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.prescription_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.sample",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.patient_mrn",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sequencing_requests.patient_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "task_runname",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "request_id",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            },
                            {
                                "content": {
                                    "field": "sample",
                                    "index": "",
                                    "value": [
                                        "t*"
                                    ]
                                },
                                "op": "in"
                            }
                        ],
                        "op": "or"
                    },
                    {
                        "content": [],
                        "op": "and"
                    },
                    {
                        "content": {
                            "field": "status",
                            "value": [
                                "draft"
                            ]
                        },
                        "op": "not-in"
                    }
                ],
                "op": "and"
            },
            "sort": [
                {
                    "field": "created_on",
                    "order": "desc"
                },
                {
                    "field": "_id",
                    "order": "desc"
                }
            ]
        },
        "query": "query SequencingsInformation($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {\n  Sequencings {\n    hits(\n      filters: $sqon\n      first: $first\n      offset: $offset\n      sort: $sort\n      searchAfter: $searchAfter\n    ) {\n      edges {\n        searchAfter\n        node {\n          id\n          request_id\n          patient_id\n          patient_mrn\n          prescription_id\n          ep\n          created_on\n          timestamp\n          requester\n          prenatal\n          ldm\n          analysis_code\n          status\n          sample\n          tasks\n          prescription_status\n          patient_relationship\n          patient_disease_status\n          task_runname\n          __typename\n        }\n        __typename\n      }\n      total\n      __typename\n    }\n    __typename\n  }\n}"
    });
    });
  });
});
