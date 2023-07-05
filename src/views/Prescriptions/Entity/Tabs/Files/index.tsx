import { useContext, useEffect, useState } from 'react';
import { extractServiceRequestId } from 'api/fhir/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import PrescriptionEntityContext from '../../context';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { getProTableDictionary } from 'utils/translation';
import { getFileTableColumns } from './columns';
import { FhirApi } from 'api/fhir';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';

const PrescriptionFiles = () => {
  const [loading, setLoading] = useState(false);
  const { prescriptionId } = useContext(PrescriptionEntityContext);
  const [docs, setDocs] = useState<DocsWithTaskInfo[]>([]);

  useEffect(() => {
    console.log("ALLO FETCHING")

    setLoading(true);
    FhirApi.searchPrescriptionFiles("812562")
      .then(({ data }) => {
        if (data?.data.taskList) {
          setDocs(extractDocsFromTask(data.data.taskList));
        } else {
          setDocs([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollContentWithFooter container>
      <GridCard
        content={
          <ProTable
            tableId="prescription-entity-files"
            columns={getFileTableColumns()}
            dataSource={[] as any}
            headerConfig={{
              enableColumnSort: true,
            }}
            loading={loading}
            showSorterTooltip={false}
            dictionary={getProTableDictionary()}
            onChange={({ current, pageSize }, filters, sorter, extra) => {}}
            size="small"
            bordered
          />
        }
      />
    </ScrollContentWithFooter>
  );
};

export default PrescriptionFiles;
