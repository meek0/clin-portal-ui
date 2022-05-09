import { FileTextOutlined } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Input } from 'antd';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useQueryParams from 'hooks/useQueryParams';
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { getAchivesTableColumns } from 'views/Archives/columns';
import { getProTableDictionary } from 'utils/translation';
import { FhirApi } from 'api/fhir';
import { FhirDoc, FhirOwner, PatientTaskResults } from 'graphql/patients/models/Patient';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { isEmpty } from 'lodash';
import Empty from '@ferlab/ui/core/components/Empty';

import styles from './index.module.scss';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

type DocsWithTaskInfo = FhirDoc & {
  key: string;
  taskRunDate: string;
  taskOwner: FhirOwner;
  taskId: string;
};

const extracDocsFromTask = (tasks: PatientTaskResults) => {
  let docsList: DocsWithTaskInfo[] = [];
  tasks.forEach((task) => {
    docsList.push(
      ...task.docs.map((doc) => ({
        ...doc,
        key: doc.id,
        taskRunAlias: task.runAlias,
        taskRunDate: task.runDate,
        taskOwner: task.owner,
        taskId: task.id,
        patientId: doc.patientReference.replace('Patient/', ''),
        hash: doc.content[0].attachment.hash,
        srRef: task.focus.reference.replace('ServiceRequest/', ''),
        size: numberFormat(Number(doc.content[0].attachment.size)),
        title: doc.content[0].attachment.title,
        format: doc.content[0].format,
        action: {
          format: doc.content[0].format,
          metadata: doc,
          urls: {
            file: doc.content[0].attachment.url,
            index: doc.content.length > 1 ? doc.content[1].attachment.url : '',
          },
        },
      })),
    );
  });
  return docsList;
};

const Archives = () => {
  const query = useQueryParams();
  const [currentPageSize, setcurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [docs, setDocs] = useState<DocsWithTaskInfo[]>([]);

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      setIsLoading(true);
      FhirApi.searchPatientFiles(searchValue)
        .then(({ data }) => {
          if (data?.data.taskList) {
            setDocs(extracDocsFromTask(data.data.taskList));
          }
        })
        .finally(() => {
          setIsLoading(false);
          setSearchDone(true);
        });
    }
  };

  useEffect(() => {
    const patientId = query.get('patientId');
    if (patientId) {
      handleSearch(patientId);
    }
  }, []);

  return (
    <ContentWithHeader
      headerProps={{
        icon: <FileTextOutlined />,
        title: intl.get('screen.archives.search.title'),
      }}
    >
      <ScrollContentWithFooter container>
        <Space direction="vertical" className={styles.archiveWrapper} size={24}>
          <Input.Search
            className={styles.archiveSearchBar}
            placeholder={intl.get('screen.archives.search.bar.placeholder')}
            allowClear
            onSearch={handleSearch}
            enterButton="Search"
            size="large"
            loading={isLoading}
            value={searchValue}
            onChange={(e) => {
              if (!e.target.value) {
                setDocs([]);
                setSearchValue('');
                setSearchDone(false);
              } else {
                setSearchValue(e.target.value);
              }
            }}
          />
          <GridCard
            content={
              isEmpty(docs) ? (
                <Empty
                  imageType="grid"
                  description={
                    searchValue && searchDone
                      ? intl.get('no.results.found')
                      : intl.get('screen.archives.search.noresults')
                  }
                />
              ) : (
                <ProTable
                  tableId="archives-table"
                  size="small"
                  loading={isLoading}
                  dictionary={getProTableDictionary()}
                  onChange={({ current, pageSize }) => {
                    if (currentPage !== current || currentPageSize !== pageSize) {
                      setCurrentPage(current!);
                      setcurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
                    }
                  }}
                  headerConfig={{
                    itemCount: {
                      pageIndex: currentPage,
                      pageSize: currentPageSize,
                      total: docs.length,
                    },
                    enableColumnSort: true,
                    enableTableExport: true,
                  }}
                  pagination={{
                    current: currentPage,
                    pageSize: currentPageSize,
                    defaultPageSize: DEFAULT_PAGE_SIZE,
                    total: docs.length,
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                  }}
                  columns={getAchivesTableColumns()}
                  dataSource={docs}
                />
              )
            }
          />
        </Space>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

export default Archives;
