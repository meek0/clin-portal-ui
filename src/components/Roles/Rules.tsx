import React from 'react';
import { useRpt } from 'hooks/useRpt';
import {DecodedRpt} from "../../auth/types";

export enum Roles {
    Practitioner,
    LDM
}

type LimitToProps = {
    children: React.ReactNode
    roles: Roles[]
}

const isPractitioner = (rptToken: DecodedRpt) =>
    !!(rptToken.authorization.permissions.find((x) => x.rsname === 'ServiceRequest'));

const isLdm = (rptToken: DecodedRpt) =>
    !!(rptToken.fhir_organization_id.find((x) => x.startsWith('LDM')));

const hasRole = (role: Roles, rpt: DecodedRpt) => {
    switch (role) {
        case Roles.Practitioner:
            return isPractitioner((rpt));
        case Roles.LDM:
            return isLdm(rpt);
        default:
            return false
    }
}

const validate = (roles: Roles[], rptToken: DecodedRpt | undefined) => {
    return rptToken && !!roles.filter(x => hasRole(x, rptToken)).length
}

export const LimitTo = ({ children, roles }: LimitToProps) : React.ReactElement => {
    const { decodedRpt } = useRpt();
    return validate(roles, decodedRpt) ? <>{children}</> : <></>;
}

