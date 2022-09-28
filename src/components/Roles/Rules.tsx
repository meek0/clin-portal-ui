import React from 'react';

import { useRpt } from 'hooks/useRpt';

import { DecodedRpt } from '../../auth/types';

export enum Roles {
  Practitioner,
  LDM,
  Download,
}

type LimitToProps = {
  children: React.ReactNode;
  roles: Roles[];
  shouldMatchAll?: boolean;
};

const canDownload = (rptToken: DecodedRpt) =>
  !!rptToken.authorization.permissions.find((x) => x.rsname === 'download');

const isPractitioner = (rptToken: DecodedRpt) =>
  !!rptToken.authorization.permissions.find((x) => x.rsname === 'ServiceRequest');

const isLdm = (rptToken: DecodedRpt) =>
  !!rptToken.fhir_organization_id.find((x) => x.startsWith('LDM'));

const hasRole = (role: Roles, rpt: DecodedRpt) => {
  switch (role) {
    case Roles.Practitioner:
      return isPractitioner(rpt);
    case Roles.LDM:
      return isLdm(rpt);
    case Roles.Download:
      return canDownload(rpt);
    default:
      return false;
  }
};

export const validate = (
  roles: Roles[],
  rptToken: DecodedRpt | undefined,
  shouldMatchAll: boolean,
) => {
  const matchRoles = rptToken ? !!roles.filter((x) => hasRole(x, rptToken)).length : 0;
  return shouldMatchAll ? matchRoles === roles.length : !!matchRoles;
};

export const LimitTo = ({
  children,
  roles,
  shouldMatchAll = false,
}: LimitToProps): React.ReactElement => {
  const { decodedRpt } = useRpt();
  return validate(roles, decodedRpt, shouldMatchAll) ? <>{children}</> : <></>;
};
