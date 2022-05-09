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
      _filter: "(patient eq ${searchValue}) or (input_specimen.accession eq ${searchValue}) or (run-name eq ${searchValue}) or (focus eq ${searchValue})"
    ) {
      id
      focus{reference}
      experiment: extension(
          url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/sequencing-experiment"
          ) @flatten @first {
           extension(url: "runDate")@flatten @first{
              runDate:valueDateTime
          }
      } 
      experiment: extension(
          url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/sequencing-experiment"
          ) @flatten @first {
           extension(url: "runAlias")@flatten @first{
            runAlias:valueString
          }
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
          docs: resource(type: DocumentReference) {
            id
            content {
              attachment {
                url
                hash
                title
                size: extension(url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/full-size") @flatten @first{ 
                  size:value
                } 
              }
              format @flatten {
                format: code
              }
            }
            context @flatten {
              related @first @flatten {
                sample: resource @flatten {
                  accessionIdentifier @flatten {
                   value
                  }
                }
              }
            }
            subject @flatten {
              patientReference: reference
            }
            type @flatten {
              coding @first @flatten {
                type: code
              }
            }
          }
        }
      }
    }
  }
`;
