import axios from 'axios';
import { VariantType } from 'graphql/variants/models';

import { GENDER, PATIENT_POSITION } from 'utils/constants';
import { generateTracks, getHyperXenomeTrack } from 'utils/IGV';

jest.mock('axios');

const files = {
  docs: [
    {
      id: 'doc1',
      type: 'GCNV',
      sample: {
        value: 'sample1',
      },
      content: [
        {
          format: 'VCF',
          attachment: {
            hash: '',
            title: '',
            url: '',
            size: '',
          },
        },
      ],
      patientReference: 'patient1',
    },
    {
      id: 'doc2',
      type: 'IGV',
      sample: {
        value: 'sample1',
      },
      content: [
        {
          format: 'BW',
          attachment: {
            hash: '',
            title: '',
            url: '',
            size: '',
          },
        },
        {
          format: 'BED',
          attachment: {
            hash: '',
            title: 'KAPA_HyperExome_hg38_combined_targets',
            url: '',
            size: '',
          },
        },
      ],
      patientReference: 'patient1',
    },
  ],
};

const files_with_aliquot_id = {
  docs: [
    {
      id: 'doc1_prescription1',
      type: 'GCNV',
      sample: {
        value: 'sample1',
      },
      content: [
        {
          format: 'VCF',
          attachment: {
            hash: '',
            title: 'cnv.file',
            url: '',
            size: '',
          },
        },
      ],
      patientReference: 'patient1',
    },
    {
      id: 'doc1_prescription2',
      type: 'GCNV',
      sample: {
        value: 'sample1',
      },
      content: [
        {
          format: 'VCF',
          attachment: {
            hash: '',
            title: 'aliquotId1.cnv.file',
            url: '',
            size: '',
          },
        },
      ],
      patientReference: 'patient1',
    },
  ],
};

beforeEach(() => {
  // Mocking axios
  axios.get.mockImplementation(async () => ({
    data: {
      url: 'mockedUrl',
    },
  }));
});

describe('generateTracks', () => {
  test('Should generate tracks', () => {
    const expected = [
      {
        autoHeight: true,
        colorBy: 'SVTYPE',
        format: 'vcf',
        indexURL: expect.any(Promise),
        name: 'CNVs: sample1 proband',
        type: 'variant',
        url: expect.any(Promise),
      },
      {
        autoHeight: true,
        colorBy: 'strand',
        format: 'cram',
        indexURL: expect.any(Promise),
        maxHeight: 500,
        name: 'Reads: undefined proband',
        sort: { chr: 'chr8', direction: 'ASC', option: 'BASE', position: 128750986 },
        type: 'alignment',
        url: expect.any(Promise),
      },
      {
        autoHeight: true,
        colorBy: 'strand',
        format: 'bigWig',
        graphType: 'points',
        maxHeight: 500,
        minHeight: 200,
        name: 'sample1 proband',
        type: 'wig',
        url: expect.any(Promise),
      },
    ];

    expect(
      generateTracks(
        files,
        VariantType.GERMLINE,
        'patient1',
        GENDER.MALE,
        PATIENT_POSITION.PROBAND,
        'rpt',
      ),
    ).toEqual(expected);
  });

  test('Should filter by aliquot Id if available', () => {
    const expected = [
      {
        autoHeight: true,
        colorBy: 'SVTYPE',
        format: 'vcf',
        indexURL: expect.any(Promise),
        name: 'CNVs: sample1 proband',
        type: 'variant',
        url: expect.any(Promise),
      },
      {
        autoHeight: true,
        colorBy: 'strand',
        format: 'cram',
        indexURL: expect.any(Promise),
        maxHeight: 500,
        name: 'Reads: undefined proband',
        sort: { chr: 'chr8', direction: 'ASC', option: 'BASE', position: 128750986 },
        type: 'alignment',
        url: expect.any(Promise),
      },
    ];

    expect(
      generateTracks(
        files_with_aliquot_id,
        VariantType.GERMLINE,
        'patient1',
        GENDER.MALE,
        PATIENT_POSITION.PROBAND,
        'rpt',
        'aliquotId1',
      ),
    ).toEqual(expected);
  });
});

describe('getHyperXenomeTrack', () => {
  test('Should get hyper xenome tracks', () => {
    const expected = {
      autoHeight: true,
      format: 'bed',
      indexURL: null,
      maxHeight: 500,
      name: 'HyperExome hg38',
      type: 'annotation',
      url: expect.any(Promise),
    };

    expect(
      getHyperXenomeTrack(files, 'patient1', GENDER.MALE, PATIENT_POSITION.PROBAND, 'rpt'),
    ).toEqual(expected);
  });
});
