import axios from 'axios';
import { VariantType } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { IAnnotationTrack, IIGVTrack } from '../components/Igv/type';
import {
  FhirDoc,
  FhirDocContent,
  FhirTask,
  PatientFileResults,
} from '../graphql/patients/models/Patient';

import { GENDER, PARENT_TYPE, PATIENT_POSITION } from './constants';
import { appendBearerIfToken, getPatientPosition } from './helper';

interface ITrackFiles {
  indexFile: string | undefined;
  mainFile: string | undefined;
}
const FHIR_CRAM_CRAI_DOC_TYPE = 'ALIR';
const FHIR_CRAM_TYPE = 'CRAM';
const FHIR_CRAI_TYPE = 'CRAI';

const FHIR_GERMLINE_VCF_TBI_DOC_TYPE = 'GCNV';
const FHIR_SOMATIC_VCF_TBI_DOC_TYPE = 'SCNV';
const FHIR_VCF_TYPE = 'VCF';
const FHIR_TBI_TYPE = 'TBI';

const FHIR_IGV_DOC_TYPE = 'IGV';
const FHIR_BED_TYPE = 'BED';
const FHIR_BW_TYPE = 'BW';
const HYPER_EXOME_FILE_NAME = 'KAPA_HyperExome_hg38_combined_targets';
const HYPER_EXOME_TRACK_NAME = 'HyperExome hg38';

enum SampleType {
  TUMOR = 'tumor sample',
  NORMAL = 'normal sample',
}

const getPresignedUrl = (file: string, rpt: string) =>
  axios
    .get(`${file}?format=json`, {
      headers: { Authorization: appendBearerIfToken(rpt) },
    })
    .then((response) => response.data.url)
    .catch((e) => {
      throw new Error(`cannot get presigned url: ${e.message}`);
    });

const findDoc = (
  files: PatientFileResults,
  docType: string,
  aliquot_id?: string,
): FhirDoc | undefined => {
  const e = files.docs.find(
    (doc) =>
      doc.type === docType &&
      (!aliquot_id || doc.content.some((c) => c.attachment?.title?.startsWith(aliquot_id))),
  );
  return e;
};

const findFiles = (doc: FhirDoc, mainType: string, indexType: string): ITrackFiles => ({
  mainFile: doc?.content!.find((content) => content.format === mainType)?.attachment.url,
  indexFile: doc?.content!.find((content) => content.format === indexType)?.attachment.url,
});

const trackName = (
  doc: FhirDoc | undefined,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  attachmentTitle?: string,
  sample?: string,
): string => {
  const trackName = `${doc?.sample.value!} ${
    sample ? sample : getPatientPosition(gender, position)
  }`;
  if (!attachmentTitle) return trackName;

  const splittedTitle = attachmentTitle.split('.');

  const namePrefix = splittedTitle[splittedTitle.length - 2];

  return `${capitalize(namePrefix)} ${trackName}`;
};

export const generateTracks = (
  files: PatientFileResults,
  variantType: VariantType,
  patientId: string,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  rpt: string,
  aliquotId?: string,
  task?: FhirTask[],
): IIGVTrack[] => {
  const tnebaTask = task?.find((t) => t.type === 'TNEBA');
  const tebaTask = task?.find((t) => t.type === 'TEBA');
  const normalSepicment = tnebaTask?.input?.find((t) => t.type.text === 'Analysed normal sample');
  const cramDoc = findDoc(files, FHIR_CRAM_CRAI_DOC_TYPE, aliquotId);
  const cramFiles = findFiles(cramDoc!, FHIR_CRAM_TYPE, FHIR_CRAI_TYPE);
  const normalDoc = files.docs.filter(
    (f) => f.sample.value === normalSepicment?.sepicmen?.accessionIdentifier.value,
  );
  const vcfDoc = findDoc(
    files,
    variantType === VariantType.GERMLINE
      ? FHIR_GERMLINE_VCF_TBI_DOC_TYPE
      : FHIR_SOMATIC_VCF_TBI_DOC_TYPE,
    aliquotId,
  );
  const vcfFiles = findFiles(vcfDoc!, FHIR_VCF_TYPE, FHIR_TBI_TYPE);

  const vcfNormalDoc = normalDoc.find((d) => d.type === FHIR_GERMLINE_VCF_TBI_DOC_TYPE);
  const vcfNormalFiles = findFiles(vcfNormalDoc!, FHIR_VCF_TYPE, FHIR_TBI_TYPE);
  const cramNormalDoc = normalDoc.find((d) => d.type === FHIR_CRAM_CRAI_DOC_TYPE);
  const cramNormalFiles = findFiles(cramNormalDoc!, FHIR_CRAM_TYPE, FHIR_CRAI_TYPE);

  const segDoc = findDoc(files, FHIR_IGV_DOC_TYPE, aliquotId);

  const newTracks: any = [];
  segDoc?.content.forEach(({ format, attachment }) => {
    if (!attachment.title.includes(HYPER_EXOME_FILE_NAME)) {
      let type = '';
      let graphType = 'bar';
      if (format === FHIR_BED_TYPE) {
        type = 'annotation';
        format = 'bed';
      } else if (format === FHIR_BW_TYPE) {
        type = 'wig';
        format = 'bigWig';
        graphType = 'points';
      }

      newTracks.push({
        type,
        format,
        url: getPresignedUrl(attachment.url!, rpt),
        name: trackName(segDoc, gender, position, attachment.title),
        autoHeight: true,
        minHeight: 200,
        maxHeight: 500,
        colorBy: 'strand',
        graphType,
      });
    }
  });

  const vcfTrack = [
    {
      type: 'variant',
      format: 'vcf',
      url: getPresignedUrl(vcfFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(vcfFiles.indexFile!, rpt),
      name: 'CNVs: ' + trackName(vcfDoc, gender, position, undefined, tebaTask && SampleType.TUMOR),
      autoHeight: true,
      colorBy: 'SVTYPE',
    },
  ];

  const cramTrack = [
    {
      type: 'alignment',
      format: 'cram',
      url: getPresignedUrl(cramFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(cramFiles.indexFile!, rpt),
      name:
        'Reads: ' + trackName(cramDoc, gender, position, undefined, tebaTask && SampleType.TUMOR),
      autoHeight: true,
      maxHeight: 500,
      colorBy: 'strand',
      sort: {
        chr: 'chr8',
        option: 'BASE',
        position: 128750986,
        direction: 'ASC',
      },
    },
  ];

  if (tnebaTask) {
    vcfTrack.push({
      type: 'variant',
      format: 'vcf',
      url: getPresignedUrl(vcfNormalFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(vcfNormalFiles.indexFile!, rpt),
      name: 'CNVs: ' + trackName(vcfNormalDoc, gender, position, undefined, SampleType.NORMAL),
      autoHeight: true,
      colorBy: 'SVTYPE',
    });

    cramTrack.push({
      type: 'alignment',
      format: 'cram',
      url: getPresignedUrl(cramNormalFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(cramNormalFiles.indexFile!, rpt),
      name: 'Reads: ' + trackName(cramNormalDoc, gender, position, undefined, SampleType.NORMAL),
      autoHeight: true,
      maxHeight: 500,
      colorBy: 'strand',
      sort: {
        chr: 'chr8',
        option: 'BASE',
        position: 128750986,
        direction: 'ASC',
      },
    });
  }

  return [...vcfTrack, ...cramTrack, ...newTracks];
};

export const getHyperXenomeTrack = (
  files: PatientFileResults,
  patientId: string,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  rpt: string,
  aliquot_id?: string,
): IAnnotationTrack | null => {
  const doc = findDoc(files, FHIR_IGV_DOC_TYPE, aliquot_id);
  if (!doc) return null;

  const { attachment } = doc?.content.find(({ attachment }) =>
    attachment.title.includes(HYPER_EXOME_FILE_NAME),
  ) as FhirDocContent;

  return {
    type: 'annotation',
    format: 'bed',
    url: getPresignedUrl(attachment.url!, rpt),
    indexURL: null,
    name: HYPER_EXOME_TRACK_NAME,
    autoHeight: true,
    maxHeight: 500,
  };
};
