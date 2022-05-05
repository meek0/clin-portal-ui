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

import styles from './index.module.scss';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const Archives = () => {
  const query = useQueryParams();
  const [currentPageSize, setcurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const patientId = query.get('patientId');
    if (patientId) {
      setSearchValue(patientId);
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
            onSearch={() => {}}
            enterButton="Search"
            size="large"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <GridCard
            content={
              <ProTable
                tableId="archives-table"
                size="small"
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
                    total: 0,
                  },
                  enableColumnSort: true,
                  enableTableExport: true,
                }}
                pagination={{
                  current: currentPage,
                  pageSize: currentPageSize,
                  defaultPageSize: DEFAULT_PAGE_SIZE,
                  total: 0,
                  showSizeChanger: true,
                  hideOnSinglePage: true,
                }}
                columns={getAchivesTableColumns()}
                dataSource={[]}
              />
            }
          />
        </Space>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

export default Archives;
