import intl from 'react-intl-universal';
import { IDictionary as FiltersDict } from '@ferlab/ui/core/components/filters/types';
import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import { IDictionary as QueryBuilderDict } from '@ferlab/ui/core/components/QueryBuilder/types';

import { GetAnalysisNameByCode } from 'store/global/types';

import { formatNumber } from './formatNumber';

export const getFiltersDictionary = (): FiltersDict => ({
  actions: {
    all: intl.get('querybuilder.filters.actions.all'),
    apply: intl.get('querybuilder.filters.actions.apply'),
    clear: intl.get('querybuilder.filters.actions.clear'),
    less: intl.get('querybuilder.filters.actions.less'),
    more: intl.get('querybuilder.filters.actions.more'),
    none: intl.get('querybuilder.filters.actions.none'),
  },
  checkBox: {
    searchPlaceholder: intl.get('querybuilder.filters.checkbox.placeholder'),
  },
  messages: {
    errorNoData: intl.get('querybuilder.filters.messages.empty'),
  },
  operators: {
    lessThan: intl.get('querybuilder.filters.operators.lessthan'),
    lessThanOfEqual: intl.get('querybuilder.filters.operators.lessthanorequal'),
    greaterThan: intl.get('querybuilder.filters.operators.greaterthan'),
    greaterThanOrEqual: intl.get('querybuilder.filters.operators.greaterthanorequal'),
    between: intl.get('querybuilder.filters.operators.between'),
  },
});

export const getProTableDictionary = (): IProTableDictionary => ({
  itemCount: {
    results: intl.get('protable.results'),
    noResults: intl.get('protable.noResults'),
    of: intl.get('protable.of'),
    selected: intl.get('protable.selected'),
    selectedPlural: intl.get('protable.selectedPlural'),
    selectAllResults: intl.get('protable.selectAllResults'),
    clear: intl.get('protable.clear'),
  },
  numberFormat: formatNumber,
});

export const getQueryBuilderDictionary = (
  facetResolver: (key: string) => React.ReactNode,
  getAnalysisNameByCode: GetAnalysisNameByCode,
): QueryBuilderDict => {
  const analysisMap = {
    MITN: getAnalysisNameByCode('MITN'),
    DYSTM: getAnalysisNameByCode('DYSTM'),
    MYOPC: getAnalysisNameByCode('MYOPC'),
    DI: getAnalysisNameByCode('DI'),
    RHAB: getAnalysisNameByCode('RHAB'),
    MYASC: getAnalysisNameByCode('MYASC'),
    MMG: getAnalysisNameByCode('MMG'),
    HYPM: getAnalysisNameByCode('HYPM'),
  };

  return {
    query: {
      combine: {
        and: intl.get('querybuilder.query.combine.and'),
        or: intl.get('querybuilder.query.combine.or'),
      },
      noQuery: intl.get('querybuilder.query.noQuery'),
      facet: facetResolver,
      facetValueMapping: {
        'donors.analysis_code': analysisMap,
        panels: analysisMap,
        'consequences.predictions.fathmm_pred': {
          T: intl.get('filters.options.consequences.predictions.fathmm_pred.T'),
          D: intl.get('filters.options.consequences.predictions.fathmm_pred.D'),
        },
        'consequences.predictions.polyphen2_hvar_pred': {
          B: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.B'),
          D: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.D'),
          P: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.P'),
        },
        'consequences.predictions.sift_pred': {
          T: intl.get('filters.options.consequences.predictions.sift_pred.T'),
          D: intl.get('filters.options.consequences.predictions.sift_pred.D'),
        },
        'consequences.predictions.lrt_pred': {
          N: intl.get('filters.options.consequences.predictions.lrt_pred.N'),
          U: intl.get('filters.options.consequences.predictions.lrt_pred.U'),
          D: intl.get('filters.options.consequences.predictions.lrt_pred.D'),
        },
        chromosome: {
          true: '1',
        },
      },
    },
    actions: {
      new: intl.get('querybuilder.actions.new'),
      addQuery: intl.get('querybuilder.actions.addQuery'),
      combine: intl.get('querybuilder.actions.combine'),
      labels: intl.get('querybuilder.actions.labels'),
      changeOperatorTo: intl.get('querybuilder.actions.changeOperatorTo'),
      delete: {
        title: intl.get('querybuilder.actions.delete.title'),
        cancel: intl.get('querybuilder.actions.delete.cancel'),
        confirm: intl.get('querybuilder.actions.delete.confirm'),
      },
      clear: {
        title: intl.get('querybuilder.actions.clear.title'),
        cancel: intl.get('querybuilder.actions.clear.cancel'),
        confirm: intl.get('querybuilder.actions.clear.confirm'),
        buttonTitle: intl.get('querybuilder.actions.clear.buttonTitle'),
        description: intl.get('querybuilder.actions.clear.description'),
      },
    },
  };
};
