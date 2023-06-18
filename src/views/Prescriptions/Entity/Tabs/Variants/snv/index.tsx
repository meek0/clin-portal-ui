import SidebarMenu from '@ferlab/ui/core/components/SidebarMenu';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { extractServiceRequestId } from 'api/fhir/helper';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { getMenuItems } from 'views/Snv/Exploration/Patient/facets';
import PageContent from 'views/Snv/Exploration/Patient/PageContent';
import { SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import styles from './index.module.scss';

const SnvPatient = () => {
  const { prescription, patientId } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, patientId /** prescriptionid */);

  return (
    <div className={styles.snvVariant}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={getMenuItems(variantMappingResults, filterMapper)}
      />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={patientId}
          prescriptionId={prescription ? extractServiceRequestId(prescription?.id) : undefined}
        />
      </ScrollContentWithFooter>
    </div>
  );
};

const SnvPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <SnvPatient />
  </ApolloProvider>
);

export default SnvPatientWrapper;
