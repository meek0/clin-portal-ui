import SidebarMenu from '@ferlab/ui/core/components/SidebarMenu';
import intl from 'react-intl-universal';
import PageContent from 'views/Variants/Exploration';
import ApolloProvider from 'providers/ApolloProvider';
import { Space, Tag } from 'antd';
import { GraphqlBackend } from 'providers';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { SCROLL_WRAPPER_ID } from './utils/constant';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { useParams } from 'react-router';
import { usePrescriptionEntity } from 'graphql/prescriptions/actions';
import { getPositionTag } from 'graphql/prescriptions/helper';
import { wrapSqonWithDonorIdAndSrId } from './utils/helper';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { getMenuItems } from './facets';

import styles from './index.module.scss';

const VariantExploration = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const { prescription, loading } = usePrescriptionEntity(prescriptionid);

  const getExtra = () =>
    patientid && prescriptionid
      ? [
          <Tag color="blue" key="patient-prescription-id">
            <Space align="center">
              {`Patient ID : ${patientid}`} | {`Prescription ID : ${prescriptionid}`}
            </Space>
          </Tag>,
          <Tag color="geekblue" key="analsysis-name">
            {prescription?.analysis.display}
          </Tag>,
          getPositionTag(prescription),
        ]
      : [];

  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, patientid /** prescriptionid */);

  return (
    <ContentWithHeader
      headerProps={{
        icon: <LineStyleIcon />,
        title: intl.get(
          patientid ? 'screen.variantsearch.title' : 'screen.variantsearch.rqdm.title',
        ),
        extra: getExtra(),
        loading: loading,
      }}
      className={styles.variantLayout}
    >
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={getMenuItems(!!patientid, variantMappingResults, filterMapper)}
      />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={patientid}
          prescriptionId={prescriptionid}
        />
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const VariantExplorationWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantExploration />
  </ApolloProvider>
);

export default VariantExplorationWrapper;
