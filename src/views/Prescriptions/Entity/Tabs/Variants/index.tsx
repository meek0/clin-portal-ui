import { useContext } from 'react';
import intl from 'react-intl-universal';
import { InfoCircleFilled } from '@ant-design/icons';
import { Result, Select, Space, Spin, Typography } from 'antd';
import { VariantType } from 'graphql/variants/models';

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
import SnvTNPatient from './snvTN';
import { extractOptionValue, formatOptionValue, getRequestOptions, hasVariantInfo } from './utils';

import styles from './index.module.css';

const PrescriptionVariants = () => {
  const queryParams = useQueryParams();
  const {
    prescription,
    selectedRequest,
    selectedBasedOnRequest,
    variantInfo,
    setVariantInfo,
    loading,
  } = useContext(PrescriptionEntityContext);

  const patientTags = variantInfo.patientId
    ? PatientTags(variantInfo.patientId, selectedRequest, selectedBasedOnRequest)
    : [];

  const defaultVariantSection =
    variantInfo.variantType === VariantType.GERMLINE ? VariantSection.SNV : VariantSection.SNVTO;
  const variantSection = queryParams.get(VariantSectionKey) || defaultVariantSection;
  const getVariantPage = () => {
    switch (variantSection) {
      case VariantSection.SNV:
      case VariantSection.SNVTO:
        return <SnvPatient variantSection={variantSection} />;
      case VariantSection.SNVTN:
        return <SnvTNPatient variantSection={variantSection} />;
      case VariantSection.CNV:
      case VariantSection.CNVTO:
        return <CnvPatient variantSection={variantSection} />;

      default:
        break;
    }
  };

  const selectOptions = getRequestOptions(prescription);

  return !prescription || selectOptions.length ? (
    <div>
      <ContentHeader
        title=""
        extra={[
          <>
            {hasVariantInfo(variantInfo) && (
              <Space key="request">
                <Typography.Text strong>
                  {intl.get('prescription.variants.header.request')} :
                </Typography.Text>
                <Select
                  size="small"
                  className={styles.variantSelect}
                  value={formatOptionValue(variantInfo.patientId!, variantInfo.requestId!)}
                  defaultValue={selectOptions[0]?.value}
                  options={getRequestOptions(prescription)}
                  onChange={(value) => setVariantInfo(extractOptionValue(value as string))}
                  dropdownStyle={{ minWidth: 200 }}
                />
              </Space>
            )}
          </>,
          <VariantSectionNav
            key="variant-section-nav"
            extum={prescription?.code.includes('EXTUM')}
            requestID={selectedRequest?.id}
          />,
          ...patientTags,
        ]}
        loading={loading}
      />
      {hasVariantInfo(variantInfo) ? (
        getVariantPage()
      ) : (
        <div className={styles.loadingContainer}>
          <Spin spinning />
        </div>
      )}
    </div>
  ) : (
    <div className={styles.noRequests}>
      <Result
        status={'info'}
        title={intl.get('result.notfound.request.variants.title')}
        icon={<InfoCircleFilled />}
      />
    </div>
  );
};

export default PrescriptionVariants;
