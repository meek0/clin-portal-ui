import { useContext } from 'react';
import intl from 'react-intl-universal';
import { Select, Space, Typography } from 'antd';
import { getFamilyCode } from 'graphql/prescriptions/helper';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import PatientTags from 'components/Variant/PatientTags';
import useQueryParams from 'hooks/useQueryParams';

import PrescriptionEntityContext from '../../context';

import VariantSectionNav, {
  VariantSection,
  VariantSectionKey,
} from './components/VariantSectionNav';
import CnvPatient from './cnv';
import SnvPatient from './snv';

const PrescriptionVariants = () => {
  const queryParams = useQueryParams();
  const { prescription, patientId, prescriptionId, basedOnPrescription } =
    useContext(PrescriptionEntityContext);

  const patientTags = patientId
    ? PatientTags(patientId, prescriptionId, prescription, basedOnPrescription)
    : [];

  const variantSection = queryParams.get(VariantSectionKey) || VariantSection.SNV;

  const familyCode = getFamilyCode(prescription, patientId!);

  return (
    <div>
      <ContentHeader
        title=""
        extra={[
          <Space key="request">
            <Typography.Text strong>
              {intl.get('prescription.variants.header.request')} :
            </Typography.Text>
            <Select
              size="small"
              defaultValue={'1'}
              options={[
                {
                  label: `${
                    familyCode ? intl.get(familyCode) : intl.get('proband')
                  } (${patientId})`,
                  value: '1',
                },
              ]}
            />
          </Space>,
          <VariantSectionNav key="variant-section-nav" />,
          ...patientTags,
        ]}
      />
      {variantSection === VariantSection.SNV ? <SnvPatient /> : <CnvPatient />}
    </div>
  );
};

export default PrescriptionVariants;
