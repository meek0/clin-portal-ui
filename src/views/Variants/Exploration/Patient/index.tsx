import intl from 'react-intl-universal';
import ApolloProvider from 'providers/ApolloProvider';
import { Space, Tag } from 'antd';
import { GraphqlBackend } from 'providers';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import { useParams } from 'react-router';
import { usePrescriptionEntity } from 'graphql/prescriptions/actions';
import { getPositionTag } from 'graphql/prescriptions/helper';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { getMenuItems } from './facets';
import VariantSearchLayout from '../components/VariantSearchLayout';
import { wrapSqonWithDonorIdAndSrId } from 'views/Variants/utils/helper';
import PageContent from './PageContent';

const VariantExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const { prescription, loading } = usePrescriptionEntity(prescriptionid);

  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, patientid /** prescriptionid */);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.title'),
        extra: [
          <Tag color="blue" key="patient-prescription-id">
            <Space align="center">
              {`Patient ID : ${patientid}`} | {`Prescription ID : ${prescriptionid}`}
            </Space>
          </Tag>,
          <Tag color="geekblue" key="analsysis-name">
            {prescription?.analysis.display}
          </Tag>,
          getPositionTag(prescription),
        ],
        loading: loading,
      }}
      menuItems={getMenuItems(variantMappingResults, filterMapper)}
    >
      <PageContent
        variantMapping={variantMappingResults}
        patientId={patientid}
        prescriptionId={prescriptionid}
      />
    </VariantSearchLayout>
  );
};

const VariantExplorationPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantExplorationPatient />
  </ApolloProvider>
);

export default VariantExplorationPatientWrapper;
