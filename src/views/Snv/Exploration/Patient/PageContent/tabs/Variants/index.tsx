import { Key, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SORT_QUERY,
  SCROLL_WRAPPER_ID,
} from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
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
  variantSection?: VariantSection;
  isSameLDM?: boolean;
  setFilterList: (columnKeys: Key[]) => void;
  filtersList: TVariantFilter;
  isClear: boolean;
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
  variantSection,
  isSameLDM,
  setFilterList,
  filtersList,
  isClear,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { loading: loadingRpt, rpt } = useRpt();
  const [modalOpened, toggleModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const donor = findDonorById(selectedVariant?.donors, patientId);

  const variantType = getVariantTypeFromSNVVariantEntity(results?.data?.[0]);

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
              enableTableExport: true,
              tableExportDisabled: (results?.total || 0) === 0,
              itemCount: {
                pageIndex: pageIndex,
                pageSize: queryConfig.size,
                total: results?.total || 0,
              },
              enableColumnSort: true,
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
                filtersList.flags.length > 0 ||
                filtersList.note.length > 0 ||
                (filtersList.interpretation && filtersList.interpretation.length > 0)
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
