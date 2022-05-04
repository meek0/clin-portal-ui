import PositionTag from 'components/uiKit/PositionTag';
import { PATIENT_POSITION } from 'utils/constants';
import { PrescriptionResult } from './models/Prescription';

export const getPositionTag = (prescription: PrescriptionResult | undefined) => {
  if (prescription && prescription?.familyInfo?.type !== 'solo') {
    return (
      <PositionTag
        isProband={prescription.patientInfo.position.toLowerCase() === PATIENT_POSITION.PROBAND}
      ></PositionTag>
    );
  }
};
