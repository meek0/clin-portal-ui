import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import copy from 'copy-to-clipboard';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import { useAppDispatch } from 'store';
import { globalActions } from 'store/global';
import { createSavedFilter, deleteSavedFilter, updateSavedFilter } from 'store/savedFilter/thunks';
import { SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'utils/constants';
import { getCurrentUrl } from 'utils/helper';

import { TUserSavedFilter } from '../api/savedFilter/models';

const useSavedFiltersActions = (savedFilterTag: string, variantSection?: VariantSection) => {
  const dispatch = useAppDispatch();

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));

  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(
      createSavedFilter({
        ...filter,
        tag: savedFilterTag,
      }),
    );

  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));

  const handleOnShareFilter = (filter: ISavedFilter) => {
    let url = `${getCurrentUrl()}?${SHARED_FILTER_ID_QUERY_PARAM_KEY}=${filter.id}`;
    const aFilter = filter as TUserSavedFilter;
    if (aFilter.tag?.includes('patient')) {
      url = url.concat(`&variantSection=${variantSection}`).concat('#variants');
    }
    copy(url);
    dispatch(
      globalActions.displayMessage({
        content: 'Copied share url',
        type: 'success',
      }),
    );
  };

  return {
    handleOnUpdateFilter,
    handleOnSaveFilter,
    handleOnDeleteFilter,
    handleOnShareFilter,
  };
};

export default useSavedFiltersActions;
