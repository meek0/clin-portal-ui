import { Key, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity, VariantType } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { TVariantFilter } from 'views/Cnv/Exploration/variantColumns';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { getVariantTypeFromSNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import IGVModal from 'views/Snv/components//IGVModal';
import OccurenceVariant from 'views/Snv/components/OccurenceVariant';
import ReportButton from 'views/Snv/components/Report/DownloadButton';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SORT_QUERY,
  SCROLL_WRAPPER_ID,
} from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { ReportNames } from 'store/reports/types';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.css';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  patientId: string;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  queryBuilderId: string;
  setVariantType: (variantType: VariantType) => void;
  setDownloadTriggered: (value: boolean) => void;
  setSelectedRows: (value: any[]) => void;
  selectedRows: any[];
  variantSection?: VariantSection;
  isSameLDM?: boolean;
  setFilterList: (columnKeys: Key[]) => void;
  filtersList: TVariantFilter;
  isClear: boolean;
  query: any;
  getFilterSqon?: () => {
    content: any[];
    op: string;
  };
  queryVariables: any;
};

const VariantsTab = ({
  queryBuilderId,
  results,
  setQueryConfig,
  queryConfig,
  patientId,
  pageIndex,
  setPageIndex,
  setVariantType,
  setDownloadTriggered,
  setSelectedRows,
  selectedRows,
  variantSection,
  isSameLDM,
  setFilterList,
  filtersList,
  isClear,
  queryVariables,
  getFilterSqon,
  query,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { loading: loadingRpt, rpt } = useRpt();
  const [modalOpened, toggleModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const [rowSelected, toggleRowSelected] = useState<boolean>(false);
  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };
  const [interpretationList, setInterpretationList] = useState<any>([]);

  const changeInterpretationList = (hash: string) => {
    const newList = [...interpretationList, hash];

    setInterpretationList([...new Set(newList)]);
  };

  const donor = findDonorById(selectedVariant?.donors, patientId);
  const variantType = getVariantTypeFromSNVVariantEntity(results?.data?.[0]);

  useEffect(() => {
    const list = results.data
      .filter((item) => item.interpretation !== undefined && item.interpretation !== null)
      .map((item) => item.hash);
    setInterpretationList([...new Set([...list, ...interpretationList])]);
  }, [results]);

  const getSomaticColumns = () =>
    variantSection === VariantSection.SNVTO
      ? user.config.data_exploration?.tables?.patientSnvTo?.columns
      : user.config.data_exploration?.tables?.patientSnvTn?.columns;

  const initialColumnState =
    variantType === VariantType.GERMLINE
      ? user.config.data_exploration?.tables?.patientSnvGermline?.columns
      : getSomaticColumns();

  setVariantType(variantType);
  const columns = getVariantColumns(
    queryBuilderId,
    variantType,
    patientId,
    undefined,
    results?.data.length === 0,
    variantSection,
    isSameLDM,
    isClear,
    setFilterList,
    filtersList,
    interpretationList,
    changeInterpretationList,
  );
  const canExtend = (section: VariantSection) =>
    [VariantSection.SNV, VariantSection.SNVTN, VariantSection.SNVTO].includes(section);

  return (
    <>
      {donor && selectedVariant && (
        <IGVModal
          rpt={rpt}
          donor={donor}
          variantEntity={selectedVariant}
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
      <FixedSizeTable
        numberOfColumn={initialColumnState || []}
        fixedProTable={(dimension) => (
          <ProTable<ITableVariantEntity>
            tableId="variant_table"
            className={style.variantSearchTable}
            wrapperClassName={style.variantTabWrapper}
            columns={columns}
            initialColumnState={initialColumnState}
            dataSource={results?.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
            loading={results?.loading}
            dictionary={getProTableDictionary()}
            expandable={
              variantSection && canExtend(variantSection)
                ? {
                    expandedRowRender: (record) => (
                      <OccurenceVariant
                        record={record}
                        rpt={rpt}
                        loadingRpt={loadingRpt}
                        patientId={patientId}
                        igvModalCb={openIgvModal}
                        variantSection={variantSection}
                        changeInterpretationList={changeInterpretationList}
                      />
                    ),
                    expandedRowClassName: () => style.expendableTable,
                  }
                : undefined
            }
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
              extra: [
                <ReportButton
                  key="reportButton"
                  icon={<DownloadOutlined width={'16'} height={'16'} />}
                  patientId={patientId!}
                  data={selectedRows}
                  name={ReportNames.transcript}
                  size={'small'}
                  tooltipTitle={
                    selectedRows.length === 0 ? intl.get('protable.report.tooltip') : undefined
                  }
                  disabled={selectedRows.length === 0 && !rowSelected}
                  buttonText={intl.get('protable.report')}
                  selected={rowSelected}
                  total={results?.total}
                  operations={queryConfig?.operations}
                  getFilterSqon={getFilterSqon}
                  query={query}
                  queryVariables={queryVariables}
                />,
              ],
              enableTableExport: true,
              tableExportDisabled: (results?.total || 0) === 0,
              itemCount: {
                pageIndex: pageIndex,
                pageSize: queryConfig.size,
                total: results?.total || 0,
              },
              enableColumnSort: true,
              onSelectedRowsChange: (key, row) => {
                if (key.length === 0) {
                  toggleRowSelected(false);
                } else {
                  toggleRowSelected(true);
                }
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
                            patientSnvGermline: { columns },
                          },
                        },
                      })
                    : variantSection === VariantSection.SNVTO
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvTo: { columns },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvTn: { columns },
                          },
                        },
                      }),
                );
              },
              hasFilter:
                !!filtersList.flags.length ||
                !!filtersList.note.length ||
                (filtersList.interpretation && !!filtersList.interpretation.length)
                  ? true
                  : false,
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
                setPageIndex(page);
                scrollToTop(SCROLL_WRAPPER_ID);
              },
              onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                dispatch(
                  variantType === VariantType.GERMLINE
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvGermline: {
                              ...user?.config.data_exploration?.tables?.patientSnvGermline,
                              viewPerQuery,
                            },
                          },
                        },
                      })
                    : variantSection === VariantSection.SNVTO
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvTo: {
                              ...user?.config.data_exploration?.tables?.patientSnvTo,
                              viewPerQuery,
                            },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvTn: {
                              ...user?.config.data_exploration?.tables?.patientSnvTn,
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
    </>
  );
};

export default VariantsTab;
