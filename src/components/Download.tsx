import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { IQueryOperationsConfig } from '@ferlab/ui/core/graphql/types';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import cloneDeep from 'lodash/cloneDeep';
import { downloadAsTSV } from 'views/Prescriptions/utils/export';

import GenericModal from 'components/utils/GenericModal';
import { globalActions } from 'store/global';

import { sendRequestWithRpt } from '../api';
import { ARRANGER_API_PROJECT_URL } from '../providers/ApolloProvider';

type OwnProps = {
  queryVariables: any; // can be anything because of new weighted average obj
  maxAllowed: number;
  columns?: any;
  prefix: string;
  triggered: boolean;
  setTriggered: (value: boolean) => void;
  total: number;
  mapping?: any;
  columnKey: string;
  data: any; // Type any because this component is generic so data can be of any types
  query: any;
  operations?: IQueryOperationsConfig;
  patientId?: string;
  queryKey: string;
  getFilterSqon?: () => {
    content: any[];
    op: string;
  };
};

const DownloadTSVWrapper = ({
  maxAllowed,
  columns,
  queryVariables,
  triggered,
  setTriggered,
  prefix,
  total,
  mapping,
  columnKey,
  query,
  operations,
  patientId,
  data,
  queryKey,
  getFilterSqon,
}: OwnProps) => {
  const [showModalLimit, setShowModalLimit] = useState(false);
  const dispatch = useDispatch();
  const noShowColumnsKey = ['actions', 'note', 'clinGen'];
  const dataIntoTSV = (data: any) => {
    downloadAsTSV(
      data,
      [],
      columnKey,
      columns.filter((col: any) => !noShowColumnsKey.includes(col.key)),
      prefix,
      mapping,
      patientId ? patientId : undefined,
    );
  };
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

  const fetchDataFromAPI = () => {
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
        hydrateResults(res.data.data[queryKey]?.hits?.edges || [], operations?.previous),
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
    const selectedData = cloneDeep(data || []);
    const downloadAll = selectedData.length === 0;

    const downloaded = await fetchDataFromAPI();
    if (downloadAll) {
      if (total > maxAllowed) {
        setShowModalLimit(true);
      } else {
        dataIntoTSV(downloaded);
      }
    } else if (selectedData.length > 0) {
      if (selectedData.length > maxAllowed) {
        setShowModalLimit(true);
      } else {
        dataIntoTSV(selectedData.length === downloaded?.length ? downloaded : selectedData);
      }
    }
    setTriggered(false);
  };

  useEffect(() => {
    if (triggered) {
      download();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered]);

  return (
    <>
      <GenericModal
        type={'warning'}
        title={intl.get('screen.patientsnv.results.table.download.limit.title')}
        message={intl.get('screen.patientsnv.results.table.download.limit.message', {
          MAX_VARIANTS_DOWNLOAD: maxAllowed,
        })}
        okText={intl.get('screen.patientsnv.results.table.download.limit.button')}
        showModal={showModalLimit}
        onClose={() => setShowModalLimit(false)}
      />
    </>
  );
};

export default DownloadTSVWrapper;
