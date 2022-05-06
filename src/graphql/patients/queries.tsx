import { gql } from '@apollo/client';

export const PATIENTS_QUERY = gql`
  query PatientsInformation($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Patients {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            cid
            score
            birthDate
            bloodRelationship
            ethnicity
            familyId
            familyType
            fetus
            firstName
            gender
            lastName
            position
            ramq
            timestamp
            mrn
            organization {
              cid
              name
            }
            requests {
              status
              submitted
              analysis {
                code
                display
              }
            }
            practitioner {
              cid
              firstName
              lastName
            }
          }
        }
        total
      }
    }
  }
`;

export const PATIENT_ENTITY_QUERY = gql`
  query PatientsInformation($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Patients {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            cid
            requests {
              state
              status
              submitted
              timestamp
              analysis {
                code
                display
              }
            }
          }
        }
        total
      }
    }
  }
`;

export const PATIENT_FILES_QUERY = (patientID: string) => gql`
  {
    Patient(id: "${patientID}") {
      id
      docs: DocumentReferenceList(_reference: subject) {
        id
        type @flatten {
          coding @flatten {
            type: code @first @singleton
          }
        }
        context @flatten
        {
          related@first @flatten {
            sample:resource @flatten {
              accessionIdentifier @flatten{value}
            }
          }
        }
        content {
          attachment {
            url
            hash
            title
          }
          format @flatten {
            format: code
          }
        }
      }
    }
  }
`;

export const SEARCH_PATIENT_FILES_QUERY = (searchValue: string) => gql`
  {
    taskList: TaskList(
      _filter: "(patient.identifier eq ${searchValue}) or (input_specimen.accession eq ${searchValue}) or ( run-name eq ${searchValue})"
    ) {
      id
      focus @flatten {
        serviceRequestReference: reference
      }
      owner @flatten {
        owner: resource(type: Organization) {
          id
          alias @first @singleton
          contact @flatten @first @singleton {
            telecom @flatten @first @singleton {
              email: value
            }
          }
        }
      }
      output @flatten {
        valueReference @flatten {
          documents: resource(type: DocumentReference) {
            contentList: content {
              attachment {
                url
                hash64: hash
                title
              }
              format @flatten {
                fileFormat: code
              }
            }
            context @flatten {
              related @first @flatten {
                sample: resource @flatten {
                  accessionIdentifier @flatten {
                    sampleId: value
                  }
                }
              }
            }
            subject @flatten {
              patientReference: reference
            }
            type @flatten {
              coding @first @flatten {
                fileType: code
              }
            }
          }
        }
      }
    }
  }
`;
