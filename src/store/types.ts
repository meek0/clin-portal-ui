import { GlobalInitialState } from 'store/global';
import { TReportState } from './reports';
import { TUserState } from 'store/user';

export type RootState = {
  global: GlobalInitialState;
  report: TReportState;
  user: TUserState;
};
