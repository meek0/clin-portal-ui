import React, { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { useVariants } from 'graphql/cnv/actions';
import { VariantEntity } from 'graphql/cnv/models';
import { IQueryResults } from 'graphql/models';
import {
  buildVariantsDownloadCount,
  buildVariantsDownloadSqon,
  downloadAsTSV,
  MAX_VARIANTS_DOWNLOAD,
  VARIANT_KEY,
} from 'views/Prescriptions/utils/export';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';

import { globalActions } from 'store/global';
import { TDownload } from 'utils/searchPageTypes';

type OwnProps = {
  downloadKeys: Array<string>;
  setDownloadKeys: TDownload;
  queryVariables: any;
  variants: IQueryResults<VariantEntity[]>;
};

const Download = ({ downloadKeys, setDownloadKeys, queryVariables, variants }: OwnProps) => {
  const [downloadModalLimit, downloadModalLimitHolder] = Modal.useModal();
  const dispatch = useDispatch();

  const variantToDownloadCount = buildVariantsDownloadCount(downloadKeys, variants.total);

  const variantsToDownload = useVariants({
    ...queryVariables,
    first: variantToDownloadCount,
    searchAfter: undefined,
    sqon: buildVariantsDownloadSqon(downloadKeys, VARIANT_KEY, queryVariables.sqon),
  });

  useEffect(() => {
    if (downloadKeys.length > 0 && !variantsToDownload.loading) {
      if (variantsToDownload.data.length === 0) {
        if (variantsToDownload.error) {
          dispatch(
            globalActions.displayNotification({
              type: 'error',
              message: intl.get('screen.patientsnv.results.table.download.error.title'),
              description: intl.get('screen.patientsnv.results.table.download.error.message'),
            }),
          );
        } else {
          downloadModalLimit.warning({
            title: intl.get('screen.patientsnv.results.table.download.limit.title'),
            content: (
              <>
                <p>
                  {intl.get('screen.patientsnv.results.table.download.limit.message', {
                    MAX_VARIANTS_DOWNLOAD,
                  })}
                </p>
              </>
            ),
          });
        }
      } else if (variantsToDownload.data.length > 0) {
        downloadAsTSV(
          variantsToDownload.data,
          downloadKeys,
          VARIANT_KEY,
          getVariantColumns(),
          'SNV',
        );
      }
      setDownloadKeys([]); // reset download
    }
  }, [downloadKeys, setDownloadKeys, downloadModalLimit, variantsToDownload, dispatch]);

  useEffect(() => {
    if (downloadKeys.length > 0 && variantToDownloadCount > 0) {
      dispatch(
        globalActions.displayNotification({
          type: 'info',
          message: intl.get('screen.patientsnv.results.table.download.info.title'),
          description: intl.get('screen.patientsnv.results.table.download.info.message'),
        }),
      );
    }
  }, [dispatch, downloadKeys, variantToDownloadCount]);

  return <>{downloadModalLimitHolder}</>;
};

export default Download;
