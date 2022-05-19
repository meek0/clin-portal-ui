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
