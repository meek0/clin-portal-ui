import { ServiceRequestEntity } from 'api/fhir/models';

import PositionTag from 'components/uiKit/PositionTag';

export const getPositionTag = (
  prescription: ServiceRequestEntity | undefined,
  patientid: string,
) => {
  if (prescription) {
    return <PositionTag isProband={prescription.subject.reference === patientid}></PositionTag>;
  }
};
