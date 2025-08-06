import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { CustomPillApi } from 'api/customPill';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping } from 'graphql/models';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { getMenuItems, getSavedFilterID } from 'views/Snv/Exploration/Patient/facets';
import PageContent from 'views/Snv/Exploration/Patient/PageContent';
import { SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import useCustomPillsActions from 'hooks/useCustomPillsActions';
import { useCustomPill } from 'store/customPill';
import { fetchCustomPills } from 'store/customPill/thunks';
import { useGlobals, useLang } from 'store/global';
import { getQueryBuilderDictionary } from 'utils/translation';

import { VariantSection } from '../components/VariantSectionNav';

import styles from './index.module.css';

interface OwnProps {
  variantSection?: VariantSection;
}

const SnvPatient = ({ variantSection }: OwnProps) => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState<ISidebarMenuItem[]>([]);
  const [menuItemsCustomPill, setMenuItemsCustomPill] = useState<ISidebarMenuItem[]>([]);
  const { prescriptionId, variantInfo } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const { isLoading, customPills, fetchError } = useCustomPill();
  const lang = useLang();
  const filterTag = getSavedFilterID(variantSection);
  const { handleOnDeleteCustomPill, handleOnDuplicateCustomPill, handleOnUpdateCustomPill } =
    useCustomPillsActions(filterTag);
  const { getAnalysisNameByCode } = useGlobals();

  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, variantInfo.patientId, prescriptionId, variantSection);

  const facetTransResolver = (key: string) => {
    if (key === 'locus') return 'Variant';
    if (key === 'freq_rqdm_tumor_normal.pf')
      return intl.get('filters.group.freq_rqdm_tumor_normal.pf.query');
    if (key === 'freq_rqdm_tumor_only.pf')
      return intl.get('filters.group.freq_rqdm_tumor_only.pf.query');
    const title = intl
      .get(`${INDEXES.VARIANT}.filters.group.${key}`)
      .defaultMessage(intl.get(`filters.group.${key}`));

    return title
      ? title
      : variantMappingResults?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  useEffect(() => {
    dispatch(fetchCustomPills(filterTag));
  }, [dispatch, filterTag]);

  useEffect(() => {
    if (!variantMappingResults.loading) {
      const customPillItems = getMenuItems({
        variantMappingResults,
        filterMapper,
        variantSection,
        variantType: variantInfo.variantType,
        isCustomPillMenuEdition: true,
      });
      const items = getMenuItems({
        variantMappingResults,
        filterMapper,
        variantType: variantInfo.variantType,
        variantSection,
        isCustomPillMenuEdition: false,
        customPillConfig: {
          customPills: customPills[filterTag],
          hasCustomPillError: fetchError,
          isLoading,
          menuItemsEditionPill: customPillItems,
          deleteCustomPill: handleOnDeleteCustomPill,
          duplicateCustomPill: handleOnDuplicateCustomPill,
          editCustomPill: handleOnUpdateCustomPill,
          validateName: CustomPillApi.validateName,
          queryDictionary: getQueryBuilderDictionary(facetTransResolver, getAnalysisNameByCode),
        },
      });

      setMenuItemsCustomPill(customPillItems);
      setMenuItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customPills, variantMappingResults.loading, lang, variantInfo.variantType, variantSection]);

  return (
    <div className={styles.snvVariant}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={variantInfo.patientId}
          prescriptionId={prescriptionId}
          variantSection={variantSection}
          menuItemsCustomPill={menuItemsCustomPill}
        />
      </ScrollContentWithFooter>
    </div>
  );
};

const SnvPatientWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <SnvPatient {...props} />
  </ApolloProvider>
);

export default SnvPatientWrapper;
