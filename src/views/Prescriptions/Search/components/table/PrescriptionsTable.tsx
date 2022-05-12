import React, { useState } from 'react';
import { prescriptionsColumns } from './prescriptionColumns';
import {
  ITablePrescriptionResult,
  PrescriptionResult,
} from 'graphql/prescriptions/models/Prescription';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { GqlResults } from 'graphql/models';
import { getProTableDictionary } from 'utils/translation';
import { scrollToTop } from 'utils/helper';
import { PRESCRIPTION_SCROLL_ID } from 'views/Prescriptions/Search/utils/contstant';

import styles from "./PrescriptionTable.module.scss";

interface OwnProps {
  results: GqlResults<PrescriptionResult> | null;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
}

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const PrescriptionsTable = ({ results, loading = false }: OwnProps): React.ReactElement => {
  const [currentPageSize, setcurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  return (
    <ProTable<ITablePrescriptionResult>
      tableId="prescription_table"
      columns={prescriptionsColumns()}
      dataSource={results?.data.map((i) => ({ ...i, key: i.id }))}
      className={styles.prescriptionTableWrapper}
      loading={loading}
      dictionary={getProTableDictionary()}
      showSorterTooltip={false}
      bordered
      onChange={({ current, pageSize }) => {
        if (currentPage !== current || currentPageSize !== pageSize) {
          setCurrentPage(current!);
          setcurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
          scrollToTop(PRESCRIPTION_SCROLL_ID);
        }
      }}
      headerConfig={{
        itemCount: {
          pageIndex: currentPage,
          pageSize: currentPageSize,
          total: results?.total || 0,
        },
        enableColumnSort: true
      }}
      size="small"
      pagination={{
        current: currentPage,
        pageSize: currentPageSize,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results?.total ?? 0,
        showSizeChanger: true,
        hideOnSinglePage: true
      }}
    />
  );
};

export default PrescriptionsTable;
