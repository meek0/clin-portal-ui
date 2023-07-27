import { createSlice } from '@reduxjs/toolkit';

import { TUserState } from 'store/user/types';

import { fetchConfig, fetchPractitionerRole, fetchPractitionerRoles, updateConfig } from './thunks';

export const UserState: TUserState = {
  isLoading: false,
  user: {
    config: {},
    practitionerRoles: [],
    practitionerRolesBundle: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: UserState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPractitionerRole
    builder.addCase(fetchPractitionerRole.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPractitionerRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {
        ...state.user,
        practitionerRoles: action.payload,
      };
    });
    builder.addCase(fetchPractitionerRole.rejected, (state) => {
      state.isLoading = false;
    });
    // fetchPractitionerRolesBundle
    builder.addCase(fetchPractitionerRoles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPractitionerRoles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {
        ...state.user,
        practitionerRolesBundle: action.payload,
      };
    });
    builder.addCase(fetchPractitionerRoles.rejected, (state) => {
      state.isLoading = false;
    });
    // fetchConfig
    builder.addCase(fetchConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {
        ...state.user,
        config: action.payload,
      };
    });
    builder.addCase(fetchConfig.rejected, (state) => {
      state.isLoading = false;
    });
    // updateConfig
    builder.addCase(updateConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {
        ...state.user,
        config: action.payload,
      };
    });
    builder.addCase(updateConfig.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
