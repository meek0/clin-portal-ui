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
import PageContent from 'views/Cnv/Exploration/Patient/components/PageContent';
import { getMenuItems } from 'views/Cnv/Exploration/Patient/facets';
import { SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import useCustomPillsActions from 'hooks/useCustomPillsActions';
import { useCustomPill } from 'store/customPill';
import { fetchCustomPills } from 'store/customPill/thunks';
import { useGlobals, useLang } from 'store/global';
import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';
import { getQueryBuilderDictionary } from 'utils/translation';

import { VariantSection } from '../components/VariantSectionNav';

import styles from './index.module.css';

interface OwnProps {
  variantSection?: VariantSection;
}

const CnvPatient = ({ variantSection }: OwnProps) => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState<ISidebarMenuItem[]>([]);
  const [menuItemsCustomPill, setMenuItemsCustomPill] = useState<ISidebarMenuItem[]>([]);
  const { prescriptionId, variantInfo } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.CNV);
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithPatientIdAndRequestId(filters, variantInfo.patientId, prescriptionId);
  const { isLoading, customPills, fetchError } = useCustomPill();
  const lang = useLang();
  const { handleOnDeleteCustomPill, handleOnDuplicateCustomPill, handleOnUpdateCustomPill } =
    useCustomPillsActions(CNV_EXPLORATION_PATIENT_FILTER_TAG);
  const { getAnalysisNameByCode } = useGlobals();

  const facetTransResolver = (key: string) => {
    const title = intl
      .get(`${INDEXES.CNV}.filters.group.${key}`)
      .defaultMessage(intl.get(`filters.group.${key}`));

    return title
      ? title
      : variantMappingResults?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  useEffect(() => {
    dispatch(fetchCustomPills(CNV_EXPLORATION_PATIENT_FILTER_TAG));
  }, [dispatch]);

  useEffect(() => {
    if (!variantMappingResults.loading) {
      const customPillItems = getMenuItems({
        variantMappingResults,
        filterMapper,
        isCustomPillMenuEdition: true,
      });
      const items = getMenuItems({
        variantMappingResults,
        filterMapper,
        isCustomPillMenuEdition: false,
        customPillConfig: {
          variantSection,
          customPills: customPills[CNV_EXPLORATION_PATIENT_FILTER_TAG],
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
    <div className={styles.cnvVariant}>
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

const CnvPatientWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <CnvPatient {...props} />
  </ApolloProvider>
);

export default CnvPatientWrapper;
