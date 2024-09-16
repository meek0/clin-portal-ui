/* eslint-disable complexity */
import { getPractitionnerName } from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';
import { Practitioner, PractitionerBundleType, PractitionerRole } from 'api/fhir/models';
import { findDonorById } from 'graphql/variants/selector';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { renderCNVToString } from 'views/Cnv/Exploration/variantColumns';
import { renderToString as renderConsequencesToString } from 'views/Snv/components/ConsequencesCell/index';
import {
  renderAllAnalysisToString,
  renderCaddPhredToString,
  renderClinvarToString,
  renderDonorToString,
  renderExomiserAcmg_ClassificationToString,
  renderExomiserScoreToString,
  renderFlagToString,
  renderFranklinAcmg_ClassificationToString,
  renderFranklinAcmg_evidenceToString,
  renderFranklinScoreToString,
  renderGeneToString,
  renderGnomADACToString,
  renderGnomADAFToString,
  renderHotspotToString,
  renderManeToString,
  renderOmimToString,
  renderRevelScoreToString,
  renderRQDMPCToString,
  renderRQDMTNPCToString,
  renderRQDMTNToString,
  renderRQDMTOPCToString,
  renderRQDMToString,
  renderRQDMTOToString,
} from 'views/Snv/Exploration/variantColumns';

import { TABLE_EMPTY_PLACE_HOLDER, TSV_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { downloadText } from 'utils/helper';

import {
  renderAssignmentsToString,
  renderTasksToString,
} from '../Search/components/table/PrescriptionTable/columns';

export const ALL_KEYS = '*';
export const MAX_VARIANTS_DOWNLOAD = 10000;
export const MAX_VARIANTS_WITH_DONORS_DOWNLOAD = 1000;
export const VARIANT_KEY = 'hash';
export const JOIN_SEP = ' ';

const valueToStr = (value: any): string => {
  if (value) {
    if (Array.isArray(value)) {
      return value.join(JOIN_SEP);
    } else if (typeof value === 'object') {
      return getLeafNodes(value);
    }
    return String(value);
  }
  return TSV_EMPTY_PLACE_HOLDER;
};

function getLeafNodes(obj: any): string {
  function traverse(acc: any, value: any) {
    if (value) {
      if (typeof value == 'object') {
        Object.entries(value).forEach(([, v]) => {
          traverse(acc, v);
        });
      } else if (Array.isArray(value)) {
        acc.push(...value);
      } else {
        const str = new String(value);
        if (!str.startsWith('Variants') && !str.startsWith('cnv')) {
          acc.push(str);
        }
      }
    }
    return acc;
  }
  return String(Array.from(new Set(traverse([], obj))).join(JOIN_SEP));
}

export const convertToPlain = (html: string) => {
  if (html === TABLE_EMPTY_PLACE_HOLDER) {
    return TSV_EMPTY_PLACE_HOLDER;
  }
  return html.replace(/<[^>]+>/g, '');
};

export const customMapping = (prefix: string, key: string, row: any, patientId: string = '') => {
  if (prefix === 'SNV') {
    if (key === 'gene') {
      return convertToPlain(renderGeneToString(row));
    } else if (key === 'clinvar') {
      return convertToPlain(renderClinvarToString(row));
    } else if (key === 'omim') {
      return convertToPlain(renderOmimToString(row));
    } else if (key === 'consequence') {
      return convertToPlain(renderConsequencesToString(row));
    } else if (key === 'consequences.predictions.cadd_phred') {
      return convertToPlain(renderCaddPhredToString(row));
    } else if (key === 'consequences.predictions.revel_score') {
      return convertToPlain(renderRevelScoreToString(row));
    } else if (key === 'hotspot') {
      return convertToPlain(renderHotspotToString(row));
    } else if (key === 'external_frequencies.gnomad_genomes_3_1_1.af') {
      return convertToPlain(renderGnomADAFToString(row));
    } else if (key === 'external_frequencies.gnomad_genomes_3_1_1.ac') {
      return convertToPlain(renderGnomADACToString(row));
    } else if (key === 'exomiser_max.gene_combined_score') {
      return convertToPlain(renderExomiserScoreToString(row));
    } else if (key === 'exomiser_max.acmg_classification') {
      return convertToPlain(renderExomiserAcmg_ClassificationToString(row));
    } else if (key === 'frequency_RQDM.total.pf') {
      return convertToPlain(renderRQDMToString(row));
    } else if (key === 'frequency_RQDM.total.pc') {
      return convertToPlain(renderRQDMPCToString(row));
    } else if (key === 'freq_rqdm_tumor_only.pf') {
      return convertToPlain(renderRQDMTOToString(row));
    } else if (key === 'freq_rqdm_tumor_only.pc') {
      return convertToPlain(renderRQDMTOPCToString(row));
    } else if (key === 'freq_rqdm_tumor_normal.pf') {
      return convertToPlain(renderRQDMTNToString(row));
    } else if (key === 'freq_rqdm_tumor_normal.pc') {
      return convertToPlain(renderRQDMTNPCToString(row));
    } else if (key === 'franklin_max.combined_score') {
      return convertToPlain(renderFranklinScoreToString(row));
    } else if (key === 'franklin_max.acmg_classification') {
      return convertToPlain(renderFranklinAcmg_ClassificationToString(row));
    } else if (key === 'franklin_max.acmg_evidence') {
      return convertToPlain(renderFranklinAcmg_evidenceToString(row));
    } else if (key === 'MANE') {
      return convertToPlain(renderManeToString(row));
    } else if (key === 'flags') {
      return convertToPlain(renderFlagToString(row));
    } else if (
      [
        'donors.exomiser.gene_combined_score',
        'donors.exomiser.acmg_classification',
        'donors.exomiser.acmg_evidence',
        'donors.gq',
        'donors.sq',
        'donors.zygosity',
        'donors_genotype',
        'ch',
        'pch',
        'donors.transmission',
        'donors.qd',
        'donors.parental_origin',
        'donors.ad_alt',
        'donors.ad_total',
        'donors.ad_ratio',
        'donors.filters',
        'donors.franklin_combined_score',
      ].includes(key)
    ) {
      return convertToPlain(renderDonorToString(key, findDonorById(row.donors, patientId)));
    } else if (key === 'donors.all_analyses') {
      return convertToPlain(renderAllAnalysisToString(key, findDonorById(row.donors, patientId)));
    }
  } else if (prefix === 'CNV') {
    if (['calls', 'genes'].includes(key)) {
      return renderCNVToString(key, row);
    } else if (key === 'flags') {
      return convertToPlain(renderFlagToString(row));
    }
  } else if (prefix === 'PR' || prefix === 'RQ') {
    if (key === 'tasks') {
      return convertToPlain(renderTasksToString(row));
    }
    if (key === 'assignments') {
      return convertToPlain(renderAssignmentsToString(row));
    }
  }
  return null;
};

export const exportAsTSV = (
  data: any[],
  headers: string[],
  mapping: any = {},
  prefix: string,
  patientId?: string,
): string => {
  let tsv = '';
  if (data && headers && headers.length > 0) {
    tsv += headers.join('\t');
    tsv += '\n';
    data.forEach((row) => {
      const values: string[] = [];
      headers.forEach((header) => {
        const value =
          customMapping(prefix, header, row, patientId) ||
          valueToStr(get(row, get(mapping, header, header), ''));
        values.push(value);
      });
      tsv += values.join('\t');
      tsv += '\n';
    });
  }
  return tsv;
};

export const downloadAsTSV = (
  data: any[],
  dataKeys: string[],
  key: string,
  columns: any[],
  prefix: string,
  mapping: any = {},
  patientId?: string,
  forceFilter: boolean = false,
) => {
  const headers = columns.map((c) => c.key);
  const tsv = exportAsTSV(
    forceFilter ? extractSelectionFromResults(data, dataKeys, key) : data,
    headers,
    mapping,
    prefix,
    patientId,
  );
  downloadText(tsv, `${prefix}_${makeFilenameDatePart()}.tsv`, 'text/csv');
};

export const extractSelectionFromResults = (
  data: any[],
  dataKeys: string[],
  key: string,
): any[] => {
  if (dataKeys.length === 0) {
    return [];
  } else if (dataKeys.length === 1 && dataKeys[0] === ALL_KEYS) {
    return data;
  }
  return data.filter((row) => dataKeys.includes(row[key]));
};

const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');

export const makeFilenameDatePart = (date = new Date()) => {
  const prefixes = joinWithPadding([
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  ]);
  const suffixes = joinWithPadding([
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ]);
  return `${prefixes}T${suffixes}Z`;
};

export const getEmailfromPractionnerRole = (practitionerRole: PractitionerRole) =>
  practitionerRole?.telecom.find((t) => t.system === 'email');

export const getPractitionerInfoList = (
  practitionerRolesBundle?: PractitionerBundleType,
): TPractitionnerInfo[] => {
  const practitionerRoles: PractitionerRole[] = practitionerRolesBundle?.filter(
    (p) => p.resourceType === 'PractitionerRole',
  ) as PractitionerRole[];
  const infoList = practitionerRoles?.map((pr: PractitionerRole) => {
    const practitionerInfo: Practitioner = practitionerRolesBundle?.find((p) => {
      const practitioner = pr as PractitionerRole;
      if (p.resourceType === 'Practitioner') {
        return p.id === practitioner.practitioner.reference.split('/')[1];
      }
      p.id === practitioner.practitioner.reference.split('/')[1];
    }) as Practitioner;
    const email = getEmailfromPractionnerRole(pr);
    const obj: TPractitionnerInfo = {
      practitionerRoles_Id: pr.id,
      practitioner: practitionerInfo.id,
      name: practitionerInfo.name,
      email: email?.value,
      ldm: pr.organization.reference.split('/')[1],
    };
    return obj;
  });

  return orderBy(infoList, (p: TPractitionnerInfo) => p.name[0].family);
};

export const putUserFirst = (
  practitionerInfoList: TPractitionnerInfo[],
  userPractitionerId: PractitionerRole,
  allPractitionerInfoList?: TPractitionnerInfo[],
) => {
  const allInfo = allPractitionerInfoList ? allPractitionerInfoList : practitionerInfoList;
  const userInfo = allInfo.find((p) => p.practitionerRoles_Id === userPractitionerId.id);

  const newList = practitionerInfoList.filter((p) =>
    userInfo
      ? getPractitionnerName(p.name) !== getPractitionnerName(userInfo.name)
      : practitionerInfoList,
  );

  const allOtherUser = practitionerInfoList.filter((p) =>
    userInfo ? getPractitionnerName(p.name) === getPractitionnerName(userInfo.name) : null,
  );

  return userInfo ? [...allOtherUser, ...newList] : practitionerInfoList;
};
