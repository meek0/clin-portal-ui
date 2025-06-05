import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch, useSelector } from 'react-redux';
import { IQueryOperationsConfig } from '@ferlab/ui/core/graphql/types';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { Button, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { sendRequestWithRpt } from 'api';
import { ARRANGER_API_PROJECT_URL } from 'providers/ApolloProvider';
import { MAX_VARIANTS_REPORT_DOWNLOAD } from 'views/Snv/utils/constant';

import GenericModal from 'components/utils/GenericModal';
import { globalActions } from 'store/global';
import { reportSelector } from 'store/reports/selectors';
import { fetchTranscriptsReport } from 'store/reports/thunks';
import { ReportNames } from 'store/reports/types';

type Props = {
  patientId: string;
  data: any[];
  donor: any;
  name: ReportNames;
  iconOnly?: boolean;
  tooltipTitle?: string;
  icon: React.ReactElement;
  size: SizeType;
  buttonText?: string;
  operations?: IQueryOperationsConfig;
  disabled?: boolean;
  selected?: boolean;
  total?: number;
  queryVariables?: any;
  query?: any;
  getFilterSqon?: () => {
    content: any[];
    op: string;
  };
};

const DownloadButton = ({
  size,
  data,
  donor,
  name,
  iconOnly = false,
  tooltipTitle,
  icon,
  disabled,
  buttonText = intl.get('download.report'),
  selected,
  total,
  queryVariables,
  query,
  getFilterSqon,
  operations,
}: Props) => {
  const dispatch = useDispatch();
  const { loadingIds } = useSelector(reportSelector);
  const [openModal, toggleOpenModal] = useState(false);
  const loading = loadingIds.includes(data?.[0]?.hgvsg) || loadingIds.length === total;
  const commonProps = {
    disabled: loading || disabled,
    loading,
    icon,
    size,
    onClick: () => {
      if (name === ReportNames.transcript) {
        if (total) {
          if (
            data.length > MAX_VARIANTS_REPORT_DOWNLOAD ||
            (data.length === 0 && selected && total && total > MAX_VARIANTS_REPORT_DOWNLOAD)
          ) {
            toggleOpenModal(true);
          } else {
            download();
          }
        } else {
          dispatch(
            fetchTranscriptsReport({
              serviceRequestId: donor.service_request_id,
              variantIds: [data[0].hgvsg],
            }),
          );
        }
      }
    },
  };

  const fetchDataFromAPI = () => {
    const selectedHash = data.map((item: any) => item.hash);
    const newSqon = {
      content: [
        getFilterSqon ? getFilterSqon() : queryVariables.sqon,
        {
          content: {
            field: 'hash',
            value: selectedHash,
          },
          op: 'in',
        },
      ],
      op: 'and',
    };

    dispatch(
      globalActions.displayNotification({
        type: 'info',
        message: intl.get('screen.patientsnv.results.table.download.info.title'),
        description: intl.get('screen.patientsnv.results.table.download.info.message'),
      }),
    );

    return sendRequestWithRpt<{ data: any }>({
      method: 'POST',
      url: ARRANGER_API_PROJECT_URL,
      data: {
        query: query.loc ? query.loc!.source.body : query,
        variables: {
          ...queryVariables,
          searchAfter: undefined,
          first: data.length > 0 ? data.length : total,
          sqon: data.length > 0 ? newSqon : getFilterSqon ? getFilterSqon() : queryVariables.sqon,
        },
      },
    })
      .then((res: any) =>
        hydrateResults(res.data.data['Variants']?.hits?.edges || [], operations?.previous),
      )
      .catch(() => {
        dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('screen.patientsnv.results.table.download.error.title'),
            description: intl.get('screen.patientsnv.results.table.download.error.message'),
          }),
        );
      });
  };

  const download = async () => {
    const downloadAll = data.length === 0;

    const downloaded = await fetchDataFromAPI();
    const allIds: string[] = downloaded?.map((d: any) => d.hgvsg as string) || [];
    if (total) {
      if (downloadAll) {
        dispatch(
          fetchTranscriptsReport({
            serviceRequestId: donor.service_request_id,
            variantIds: allIds,
          }),
        );
      } else {
        const listIds = data.map((d: any) => d.hgvsg);
        dispatch(
          fetchTranscriptsReport({
            serviceRequestId: donor.service_request_id,
            variantIds: listIds,
          }),
        );
      }
    }
  };

  return (
    <>
      <GenericModal
        type={'warning'}
        title={intl.get('screen.patientsnv.results.table.download.limit.title')}
        message={intl.get('screen.patientsnv.results.table.download.report.limit.message', {
          MAX_VARIANTS_DOWNLOAD: MAX_VARIANTS_REPORT_DOWNLOAD,
        })}
        okText={intl.get('screen.patientsnv.results.table.download.limit.button')}
        showModal={openModal}
        onClose={() => toggleOpenModal(false)}
      />
      <Tooltip title={tooltipTitle}>
        {iconOnly ? (
          <Button type={'text'} {...commonProps} />
        ) : (
          <Button {...commonProps}>{buttonText}</Button>
        )}
      </Tooltip>
    </>
  );
};

export default DownloadButton;
