import intl from 'react-intl-universal';
import { extractOrganizationId } from 'api/fhir/helper';

import { getAnalysisNameByCodeFromLocal } from 'utils/fhir';

export const transformNameIfNeeded = (field: string, fkey: string, name: string) => {
  if (field.includes('lastNameFirstName') && fkey) {
    const nameSplit = fkey.split(',');
    return `${nameSplit[0].toUpperCase()} ${nameSplit[1]}`;
  }

  if (field === 'chromosome') {
    return name === 'true' ? '1' : name;
  }

  if (field === 'laboratory') {
    return extractOrganizationId(name);
  }

  if (['analysis_code', 'donors__analysis_code', 'panels'].includes(field)) {
    return getAnalysisNameByCodeFromLocal(fkey, fkey, true);
  }

  if (field === 'donors__affected_status') {
    return name === 'true' ? intl.get('affected') : intl.get('not_affected');
  }

  return name;
};
