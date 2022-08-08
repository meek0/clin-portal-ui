import { ServiceRequestEntity } from 'api/fhir/models';
import { find } from 'lodash';

import PositionTag from 'components/uiKit/PositionTag';

const isParent = (prescription: ServiceRequestEntity | undefined, patientid: string) => {
  const findParent = find(prescription?.extensions, function (o) {
    return o.extension?.[1].valueReference?.reference.includes(patientid);
  });
  return findParent ? false : true;
};

export const getPositionTag = (
  prescription: ServiceRequestEntity | undefined,
  patientid: string,
) => <PositionTag key="type-tag" isProband={isParent(prescription, patientid)} />;
