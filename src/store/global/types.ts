import { LANG } from 'utils/constants';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';
import { ArgsProps as MessageArgsProps } from 'antd/lib/message';

export enum GlobalActionsEnum {
  CHANGE_LANG = 'state/global/action/lang',
}

export type initialState = {
  lang: LANG;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsProps | undefined;
  messagesToDestroy: string[];
  isFetchingStats: boolean;
};
