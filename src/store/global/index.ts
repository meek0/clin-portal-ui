import { useSelector } from 'react-redux';
import { globalSelector } from './selector';

export type { initialState as GlobalInitialState } from './types';
export { default, GlobalState, globalActions } from './slice';
export const useGlobals = () => {
  const state = useSelector(globalSelector);

  return {
    ...state,
    getAnalysisNameByCode: (code: string, withCode: boolean, defaultValue?: string) => {
      if (code in state.analysisCodeMapping) {
        return state.analysisCodeMapping[code][withCode ? 'displayNameWithCode' : 'displayName'];
      }

      return defaultValue ?? code;
    },
  };
};
export const useLang = () =>
  useSelector(globalSelector, (left, right) => left.lang === right.lang).lang;
