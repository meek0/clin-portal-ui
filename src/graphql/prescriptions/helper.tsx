import { extractPatientId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';

import PositionTag from 'components/uiKit/PositionTag';

export const getPositionTag = (prescription: ServiceRequestEntity | undefined, patientid: string) =>
  prescription && (
    <PositionTag
      key="type-tag"
      isProband={extractPatientId(prescription.subject.reference) === patientid}
    />
  );
