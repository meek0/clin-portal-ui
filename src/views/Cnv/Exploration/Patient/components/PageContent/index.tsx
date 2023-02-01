import { useEffect, useState } from 'react';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Card } from 'antd';
import { useVariants } from 'graphql/cnv/actions';
import { ExtendedMappingResults } from 'graphql/models';
import { cloneDeep } from 'lodash';
import VariantContentLayout from 'views/Cnv/Exploration/components/VariantContentLayout';
import {
  CNV_VARIANT_PATIENT_QB_ID,
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
} from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';

import Download from 'components/Variant/Download';
import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import VariantsTable from './components/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId, prescriptionId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(CNV_VARIANT_PATIENT_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [downloadKeys, setDownloadKeys] = useState<string[]>([]);

  const getVariantResolvedSqon = (query: ISyntheticSqon) => {
    const wrappedQuery = wrapSqonWithPatientIdAndRequestId(
      cloneDeep(resolveSyntheticSqon(queryList, query)),
      patientId,
      prescriptionId,
    );
    return wrappedQuery;
  };

  const queryVariables = {
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: getVariantResolvedSqon(activeQuery),
    sort: variantQueryConfig.sort,
  };

  const variantResults = useVariants(queryVariables);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  return (
    <>
      <VariantContentLayout
        queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
        savedFilterTag={CNV_EXPLORATION_PATIENT_FILTER_TAG}
        variantMapping={variantMapping}
        activeQuery={activeQuery}
        variantResults={variantResults}
        getVariantResolvedSqon={getVariantResolvedSqon}
      >
        <Card>
          <VariantsTable
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            setDownloadKeys={setDownloadKeys}
          />
        </Card>
      </VariantContentLayout>
      <Download
        downloadKeys={downloadKeys}
        setDownloadKeys={setDownloadKeys}
        queryVariables={queryVariables}
        queryConfig={variantQueryConfig}
        variants={variantResults}
      />
    </>
  );
};

export default PageContent;
