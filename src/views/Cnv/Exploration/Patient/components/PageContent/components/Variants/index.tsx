import { Key, useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { Dropdown, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { IQueryResults } from 'graphql/models';
import { VariantType } from 'graphql/variants/models';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';
import GenesModal from 'views/Cnv/Exploration/components/GenesModal';
import IGVModal from 'views/Cnv/Exploration/components/IGVModal';
import { getVariantColumns, TVariantFilter } from 'views/Cnv/Exploration/variantColumns';
import { DEFAULT_PAGE_INDEX, DEFAULT_SORT_QUERY } from 'views/Cnv/utils/constant';
import PrescriptionEntityContext from 'views/Prescriptions/Entity/context';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { getVariantTypeFromCNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';
import { getAllRequestIds } from 'views/Prescriptions/Entity/utils';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import { SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { globalActions } from 'store/global';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import CnvCallsModal from '../CnvCallsModal';

import style from './index.module.css';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  setDownloadTriggered: any;
  setVariantType: any;
  setSelectedRows: any;
  variantSection?: VariantSection;
  isSameLDM?: boolean;
  setFilterList: (columnKeys: Key[], filter?: string) => void;
  filtersList: TVariantFilter;
  isClear: boolean;
};

const VariantsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
  setDownloadTriggered,
  setVariantType,
  setSelectedRows,
  variantSection,
  isSameLDM,
  setFilterList,
  filtersList,
  isClear,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { rpt } = useRpt();
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const [genesModalOpened, toggleGenesModal] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const openGenesModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleGenesModal(true);
  };

  const history = useHistory();

  const [isOpenCnvCallsModal, setIsOpenCnvCallsModal] = useState(false);
  const toggleCnvCallsModal = (open: boolean) => setIsOpenCnvCallsModal(open);
  const { prescription, variantInfo } = useContext(PrescriptionEntityContext);
  const [loadingCnvCalls, setLoadingCnvCalls] = useState(false);
  const [cnvCallsFiles, setCnvCallsFiles] = useState<DocsWithTaskInfo[]>([]);
  const [cnvCallsFile, setCnvCallsFile] = useState<DocsWithTaskInfo | undefined>(undefined);
  const allRequestIds = getAllRequestIds(prescription);
  const allRequestIdsAsString = JSON.stringify(allRequestIds);

  useEffect(() => {
    const fetchAllFiles = async () => {
      setLoadingCnvCalls(true);
      const results = await Promise.all(
        allRequestIds.map<Promise<DocsWithTaskInfo[]>>((requestId) =>
          FhirApi.searchPatientFiles(requestId).then(({ data }) => {
            if (data?.data.taskList) {
              return extractDocsFromTask(data.data.taskList);
            } else {
              return [];
            }
          }),
        ),
      );
      setLoadingCnvCalls(false);

      const cnvCallsFiles = results
        .reduce((a, b) => [...a, ...b], [])
        .filter((r: DocsWithTaskInfo) => r.type === 'CNVVIS' && r.format === 'PNG');

      setCnvCallsFiles(cnvCallsFiles);
    };

    if (allRequestIds.length) {
      fetchAllFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRequestIdsAsString]);

  useEffect(() => {
    if (cnvCallsFiles.length > 0 && variantInfo.requestId) {
      const file = cnvCallsFiles.find((r: DocsWithTaskInfo) => r.srRef === variantInfo.requestId);
      setCnvCallsFile(file);
    }
  }, [cnvCallsFiles, variantInfo.requestId]);

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const variantType = getVariantTypeFromCNVVariantEntity(results?.data?.[0]);
  setVariantType(variantType);

  const initialColumnState =
    variantType === VariantType.GERMLINE
      ? user.config.data_exploration?.tables?.patientCnvGermline?.columns
      : user.config.data_exploration?.tables?.patientCnvTo?.columns;

  const downloadCnvCalls = async (fileUrl: string) => {
    FhirApi.getFileURL(fileUrl)
      .then(({ data }) => {
        window.open(data?.url, '_blank');
        dispatch(
          globalActions.displayNotification({
            type: 'success',
            message: intl.get('notification.success'),
            description: intl.get('notification.success.file.download'),
          }),
        );
      })
      .catch(() => {
        dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('notification.error'),
            description: intl.get('notification.error.file.download'),
          }),
        );
      });
  };

  return (
    <>
      {selectedVariant && (
        <IGVModal
          rpt={rpt}
          variantEntity={selectedVariant}
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
      <GenesModal
        variantEntity={selectedVariant}
        isOpen={genesModalOpened}
        toggleModal={toggleGenesModal}
      />
      <FixedSizeTable
        numberOfColumn={initialColumnState || []}
        fixedProTable={(dimension) => (
          <ProTable<ITableVariantEntity>
            tableId="variant_table"
            wrapperClassName={style.variantTableWrapper}
            columns={getVariantColumns(
              variantType,
              openGenesModal,
              openIgvModal,
              results?.data.length === 0,
              variantSection,
              isSameLDM,
              isClear,
              setFilterList,
              filtersList,
              false,
              history,
            )}
            initialColumnState={initialColumnState}
            dataSource={results?.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
            loading={results?.loading}
            dictionary={getProTableDictionary()}
            showSorterTooltip={false}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(_, __, sorter) => {
              setPageIndex(DEFAULT_PAGE_INDEX);
              setQueryConfig({
                pageIndex: DEFAULT_PAGE_INDEX,
                size: queryConfig.size!,
                // @ts-ignore
                sort: formatQuerySortList(sorter, DEFAULT_SORT_QUERY),
              });
            }}
            bordered
            enableRowSelection
            headerConfig={{
              enableTableExport: true,
              tableExportDisabled: (results?.total || 0) === 0,
              itemCount: {
                pageIndex: pageIndex,
                pageSize: queryConfig.size,
                total: results?.total || 0,
              },
              enableColumnSort: true,
              extra: [
                <Tooltip
                  key="cnvCallsTooltip"
                  title={
                    loadingCnvCalls || !cnvCallsFile
                      ? intl.get('screen.patientcnv.cnv_calls.disabledButton')
                      : ''
                  }
                >
                  <Dropdown.Button
                    key="cnvCalls"
                    disabled={loadingCnvCalls || !cnvCallsFile}
                    menu={{
                      items: [
                        {
                          key: 'downloadPng',
                          label: intl.get('screen.patientcnv.cnv_calls.download'),
                        },
                      ],
                      onClick: () =>
                        cnvCallsFile && downloadCnvCalls(cnvCallsFile.action.urls.file),
                    }}
                    onClick={() => setIsOpenCnvCallsModal(true)}
                    size="small"
                    type="primary"
                  >
                    {intl.get('screen.patientcnv.cnv_calls.button')}
                  </Dropdown.Button>
                </Tooltip>,
              ],

              onSelectedRowsChange: (key, row) => {
                setSelectedRows(row);
              },
              onSelectAllResultsChange: () => {
                setSelectedRows([]);
              },
              onTableExportClick: () => {
                setDownloadTriggered(true);
              },
              onColumnSortChange: (columns) => {
                dispatch(
                  variantType === VariantType.GERMLINE
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientCnvGermline: { columns },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientCnvTo: { columns },
                          },
                        },
                      }),
                );
              },
              hasFilter: filtersList.flags.length > 0 || filtersList.note.length > 0,
              clearFilter: () => {
                setFilterList([]);
              },
            }}
            size="small"
            scroll={dimension}
            pagination={{
              current: pageIndex,
              queryConfig,
              setQueryConfig,
              onChange: (page: number) => {
                scrollToTop(SCROLL_WRAPPER_ID);
                setPageIndex(page);
              },
              onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                dispatch(
                  variantType === VariantType.GERMLINE
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientCnvGermline: {
                              ...user?.config.data_exploration?.tables?.patientCnvGermline,
                              viewPerQuery,
                            },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientCnvTo: {
                              ...user?.config.data_exploration?.tables?.patientCnvTo,
                              viewPerQuery,
                            },
                          },
                        },
                      }),
                );
              },
              searchAfter: results?.searchAfter,
              defaultViewPerQuery: queryConfig.size,
            }}
          />
        )}
      />
      {isOpenCnvCallsModal && (
        <CnvCallsModal
          cnvCallsFile={cnvCallsFile}
          downloadCnvCalls={downloadCnvCalls}
          isOpen={isOpenCnvCallsModal}
          toggleModal={toggleCnvCallsModal}
        />
      )}
    </>
  );
};

export default VariantsTable;
