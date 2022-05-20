import { gql } from '@apollo/client';

import { analysisFields } from './models/Prescription';

export const PRESCRIPTIONS_QUERY = gql`
  query PrescriptionsInformation ($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Analyses {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            patient_id
            patient_mrn
            prescription_id
            ep
            created_on
            timestamp
            requester
            ldm
            analysis_code
            status
          }
        }
        total
      }
      aggregations (filters: $sqon){
        ${analysisFields.map(
          (f) =>
            f +
            ' {\n          buckets {\n            key\n            doc_count\n          }\n        }',
        )}
      }
    }
  }
`;

export const PRESCRIPTIONS_ENTITY_QUERY = gql`
  query PrescriptionsEntity($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Prescriptions {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            cid
            mrn
            ethnicity
            bloodRelationship
            status
            state
            timestamp
            laboratory
            analysis {
              code
              display
            }
            submitted
            authoredOn
            approver {
              cid
              lastName
              firstName
              lastNameFirstName
            }

            organization {
              cid
              name
            }
            familyInfo {
              cid
              type
            }
            prescriber {
              cid
              firstName
              lastName
              lastNameFirstName
            }
            patientInfo {
              cid
              lastName
              firstName
              lastNameFirstName
              gender
              ramq
              position
              fetus
              birthDate
              familyId
              cidText
              organization {
                cid
                name
              }
            }
          }
        }
        total
      }
    }
  }
`;

export const PRESCRIPTIONS_SEARCH_QUERY = gql`
  query AnalysisSearch($sqon: JSON, $first: Int, $offset: Int) {
    Analyses {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            id
            patient_id
            patient_mrn
            prescription_id
            ep
            timestamp
            requester
            ldm
            analysis_code
          }
        }
        total
      }
    }
  }
`;

const ANALYSIS_PATIENT_FRAGMENT = gql`
  fragment PatientFields on Patient {
    reference
    resource {
      id
      gender
      identifier(fhirpath: "type.coding.code = 'MR'") @flatten @first {
        mrn: value
      }
      person: PersonList(_reference: patient) {
        id
        name {
          family
          given @first
        }
        birthDate
        identifier(fhirpath: "type.coding.code = 'JHN'") @flatten @first {
          ramq: value
        }
      }
      requests: ServiceRequestList(_reference: patient, based_on: $requestId) {
        id
        authoredOn
        specimen {
          reference
          resource {
            parent {
              reference
            }
            accessionIdentifier {
              system
              value
            }
          }
        }
        status
      }
      ClinicalImpressionList(_reference: patient) {
        id
        investigation {
          item {
            reference
            resource {
              code {
                coding {
                  system
                  code
                }
              }
              interpretation {
                coding {
                  code
                  system
                }
              }
              value {
                coding {
                  code
                  system
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ANALYSIS_ENTITY_QUERY = gql`
  ${ANALYSIS_PATIENT_FRAGMENT}
  query GetAnalysisEntity($requestId: String) {
    ServiceRequest(id: $requestId) {
      id
      authoredOn
      status
      code @flatten {
        coding(system: "http://fhir.cqgc.ferlab.bio/CodeSystem/analysis-request-code")
          @flatten
          @first {
          code
        }
      }
      performer @first {
        resource {
          alias @first
          name
        }
      }
      subject {
        ...PatientFields
      }
      extension(url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/family-member") {
        extension(url: "parent-relationship") {
          valueCoding {
            coding {
              code
            }
          }
        }
        extension(url: "parent") {
          valueReference {
            ...PatientFields
          }
        }
      }
    }
  }
`;
