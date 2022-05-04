import { LANG } from 'utils/constants';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';
import { ArgsProps as MessageArgsProps, NoticeType } from 'antd/lib/message';

export enum GlobalActionsEnum {
  CHANGE_LANG = 'state/global/action/lang',
}

export type MessageArgsPropsCustom = MessageArgsProps & { type: NoticeType };

export type initialState = {
  lang: LANG;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsPropsCustom | undefined;
  messagesToDestroy: string[];
  isFetchingStats: boolean;
};
