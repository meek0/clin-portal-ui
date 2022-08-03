import { createAsyncThunk } from '@reduxjs/toolkit';
import { PrescriptionFormApi } from 'api/form';

const fetchFormConfig = createAsyncThunk('prescription/fetchFormConfig', async () => {
  const { data } = await PrescriptionFormApi.fetchConfig();
  return data;
});

export { fetchFormConfig };
