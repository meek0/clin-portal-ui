import SidebarMenu from '@ferlab/ui/core/components/SidebarMenu';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import PageContent from 'views/Cnv/Exploration/Patient/components/PageContent';
import { getMenuItems } from 'views/Cnv/Exploration/Patient/facets';
import { SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import { VariantSection } from '../components/VariantSectionNav';

import styles from './index.module.css';

interface OwnProps {
  variantSection?: VariantSection;
}

const CnvPatient = ({ variantSection }: OwnProps) => {
  const { prescriptionId, variantInfo } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.CNV);
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithPatientIdAndRequestId(filters, variantInfo.patientId, prescriptionId);

  return (
    <div className={styles.cnvVariant}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={getMenuItems(variantMappingResults, filterMapper)}
      />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={variantInfo.patientId}
          prescriptionId={prescriptionId}
          variantSection={variantSection}
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
