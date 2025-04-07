import intl from 'react-intl-universal';
import { AnyAction, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { ApiResponse } from 'api';
import { ReportsApi } from 'api/report';
import capitalize from 'lodash/capitalize';
import { v4 as uuid } from 'uuid';

import { globalActions } from 'store/global';
import { MIME_TYPES } from 'utils/constants';
import { downloadFile } from 'utils/helper';

const extractFilename = (contentDisposition: string = '') => {
  const split = contentDisposition.split(';');
  const filenameEntry = split.find((e) => e?.startsWith(' filename=')) || '';
  return filenameEntry.split('=')?.[1] || '';
};

const showErrorNotification = (
  reportNameI18n: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) =>
  dispatch(
    globalActions.displayNotification({
      placement: 'topLeft',
      message: capitalize(intl.get('notification.error')),
      description: `${capitalize(reportNameI18n)} : ${intl.get(
        'report.notification.error.description',
      )}`,
      type: 'error',
    }),
  );

const proceedToDownload = async (
  reportNameI18n: string,
  filenameIfNotFoundInHeaders: string,
  request: Promise<ApiResponse<unknown>>,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) => {
  try {
    const r = await request;
    const { data, response } = r;
    if (!data || !response) {
      return showErrorNotification(reportNameI18n, dispatch);
    }
    const headers = response.headers;
    const filename = extractFilename(headers['content-disposition']) || filenameIfNotFoundInHeaders;
    const blob = new Blob([data as BlobPart], { type: MIME_TYPES.APPLICATION_XLSX });

    downloadFile(blob, filename);

    dispatch(
      globalActions.displayNotification({
        placement: 'topLeft',
        message: intl.get('notification.success'),
        description: `${capitalize(reportNameI18n)} : ${intl.get(
          'report.notification.success.description',
        )}`,
        type: 'success',
      }),
    );
  } catch (e) {
    showErrorNotification(reportNameI18n, dispatch);
  }
};

const fetchTranscriptsReport = createAsyncThunk<void, { patientId: string; variantIds: string[] }>(
  'report/fetchTranscriptsReport',
  async ({ patientId, variantIds }, thunkApi) => {
    await proceedToDownload(
      intl.get('report.name.interpretation'),
      `transcripts_${uuid()}.xlsx`,
      ReportsApi.fetchPatientTranscriptsReport(patientId, variantIds),
      thunkApi.dispatch,
    );
  },
);

const fetchNanuqSequencingReport = createAsyncThunk<void, { srIds: string[] }>(
  'report/fetchNanuqSequencingReport',
  async ({ srIds }, thunkApi) => {
    await proceedToDownload(
      'nanuq',
      `clin_nanuq_${uuid()}.xlsx`,
      ReportsApi.fetchNanuqSequencingReport(srIds),
      thunkApi.dispatch,
    );
  },
);

export { fetchTranscriptsReport, fetchNanuqSequencingReport };
