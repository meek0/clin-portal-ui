import { Key, useEffect, useState } from 'react';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import { resetSearchAfterQueryConfig } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  updateQueryByTableFilter,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Card } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { useVariants } from 'graphql/cnv/actions';
import { VARIANT_QUERY } from 'graphql/cnv/queries';
import { ExtendedMappingResults } from 'graphql/models';
import { VariantType } from 'graphql/variants/models';
import { cloneDeep } from 'lodash';
import VariantContentLayout from 'views/Cnv/Exploration/components/VariantContentLayout';
import { getVariantColumns, TVariantFilter } from 'views/Cnv/Exploration/variantColumns';
import {
  CNV_VARIANT_PATIENT_QB_ID,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
} from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { MAX_VARIANTS_DOWNLOAD } from 'views/Prescriptions/utils/export';
import { flagFilterQuery, noFlagQuery } from 'views/Snv/Exploration/components/Flag/FlagFilter';
import { getNoteQuery } from 'views/Snv/Exploration/components/Note/NoteFilter';
import { getQueryBuilderID } from 'views/Snv/utils/constant';

import DownloadTSVWrapper from 'components/Download';
import { useRpt } from 'hooks/useRpt';
import { resolveSyntheticSqonWithReferences } from 'utils/query';
import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import VariantsTable from './components/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
  variantSection?: VariantSection;
  menuItemsCustomPill: ISidebarMenuItem[];
};

const PageContent = ({
  variantMapping,
  patientId,
  prescriptionId,
  variantSection,
  menuItemsCustomPill,
}: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(CNV_VARIANT_PATIENT_QB_ID);
  const { decodedRpt } = useRpt();
  const { prescription } = usePrescriptionEntityContext();
  const [filtersList, setFilterList] = useState<TVariantFilter>({
    flags: [],
    note: [],
  });
  const [isClear, setIsClear] = useState<boolean>(false);

  const [variantQueryConfig, setVariantQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const handleFilterList = (columnKeys: Key[], filter?: string) => {
    if (columnKeys.length > 0) {
      setIsClear(true);
      const keytoString: string[] = columnKeys.map((key) => key.toString());
      if (filter === 'flags') {
        setFilterList({ flags: keytoString, note: filtersList.note });
      } else {
        setFilterList({ flags: filtersList.flags, note: keytoString });
      }
    } else {
      if (filter) {
        if (filter === 'flags') {
          setFilterList({ flags: [], note: filtersList.note });
        } else {
          setFilterList({ flags: filtersList.flags, note: [] });
        }
      } else {
        setFilterList({ flags: [], note: [] });
        setIsClear(false);
      }
    }
  };

  //Reset flags filter on resfresh
  useEffect(() => {
    setFilterList({ flags: [], note: [] });
    updateQueryByTableFilter({
      queryBuilderId: getQueryBuilderID(VariantSection.CNV),
      field: 'flags',
      selectedFilters: [],
    });
  }, []);

  //Reset Flag filter on clearFilter
  useEffect(() => {
    if (filtersList.flags.length === 0) {
      setIsClear(false);
      setVariantQueryConfig({
        ...variantQueryConfig,
        searchAfter: undefined,
      });
      setPageIndex(DEFAULT_PAGE_INDEX);
      updateQueryByTableFilter({
        queryBuilderId: getQueryBuilderID(VariantSection.CNV),
        field: 'flags',
        selectedFilters: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList]);

  const getVariantResolvedSqon = (query: ISyntheticSqon) => {
    const wrappedQuery = wrapSqonWithPatientIdAndRequestId(
      cloneDeep(resolveSyntheticSqonWithReferences(queryList, query)),
      patientId,
      prescriptionId,
    );
    return wrappedQuery;
  };

  const sqon = getVariantResolvedSqon(activeQuery);
  const hasFlags = filtersList.flags.length > 0;
  const hasNote = filtersList.note.length > 0;

  const queryVariables = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    sqon: getVariantResolvedSqon(activeQuery),
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'start',
      order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  };

  const getFilterSqon = () => {
    const sqonList: any[] = [];
    if (sqon) {
      sqonList.push(sqon);
      if (hasFlags) {
        filtersList.flags.includes('none')
          ? sqonList.push(noFlagQuery(filtersList.flags))
          : sqonList.push(flagFilterQuery(filtersList.flags));
      }
      if (hasNote) {
        sqonList.push(getNoteQuery(filtersList.note));
      }
      return {
        content: sqonList,
        op: 'and',
      };
    } else
      return {
        content: [],
        op: 'and',
      };
  };

  const queryVariablesFilter = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    sqon: getFilterSqon(),
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'start',
      order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  };

  const variantResultsWithFilter = useVariants(queryVariablesFilter, variantQueryConfig.operations);

  useEffect(() => {
    if (
      variantQueryConfig.firstPageFlag !== undefined ||
      variantQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setVariantQueryConfig({
      ...variantQueryConfig,
      firstPageFlag: variantQueryConfig.searchAfter,
    });
  }, [variantQueryConfig]);

  const activeQuerySnapshot = JSON.stringify(activeQuery);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });

    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuerySnapshot]);

  useEffect(() => {
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        size: variantQueryConfig.size || DEFAULT_PAGE_SIZE,
      },
      setVariantQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuerySnapshot]);

  const isSameLDM = () => {
    const org = decodedRpt?.fhir_organization_id;
    const getOrganizationReference = prescription?.performer?.find((r) =>
      r.reference.includes('Organization'),
    )?.reference;
    return org?.includes(extractOrganizationId(getOrganizationReference!));
  };

  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [variantType, setVariantType] = useState(VariantType.GERMLINE);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  return (
    <>
      <VariantContentLayout
        queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
        savedFilterTag={CNV_EXPLORATION_PATIENT_FILTER_TAG}
        variantMapping={variantMapping}
        activeQuery={activeQuery}
        variantResults={variantResultsWithFilter}
        getVariantResolvedSqon={getVariantResolvedSqon}
        menuItemsCustomPill={menuItemsCustomPill}
      >
        <Card>
          <VariantsTable
            results={variantResultsWithFilter}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setVariantType={setVariantType}
            setSelectedRows={setSelectedRows}
            setDownloadTriggered={setDownloadTriggered}
            isSameLDM={isSameLDM()}
            setFilterList={handleFilterList}
            filtersList={filtersList}
            isClear={isClear}
            variantSection={variantSection}
          />
        </Card>
      </VariantContentLayout>
      <DownloadTSVWrapper
        queryVariables={queryVariables}
        prefix="CNV"
        columnKey={'hash'}
        maxAllowed={MAX_VARIANTS_DOWNLOAD}
        columns={getVariantColumns(
          variantType,
          () => {},
          () => {},
          false,
          variantSection,
          isSameLDM(),
          undefined,
          undefined,
          undefined,
          true,
        )}
        query={VARIANT_QUERY}
        mapping={{
          // mapping of some column keys with query field
          length: 'reflen',
          filter: 'filters',
        }}
        triggered={downloadTriggered}
        setTriggered={setDownloadTriggered}
        total={variantResultsWithFilter.total}
        queryKey={'cnv'}
        data={selectedRows}
        getFilterSqon={getFilterSqon}
      />
    </>
  );
};

export default PageContent;
