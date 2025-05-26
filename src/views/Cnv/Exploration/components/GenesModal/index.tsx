import { useState } from 'react';
import intl from 'react-intl-universal';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { Button, Modal } from 'antd';
import { ITableGeneEntity, VariantEntity } from 'graphql/cnv/models';
import { DEFAULT_PAGE_SIZE } from 'views/Cnv/utils/constant';

import { formatDnaLength } from 'utils/formatNumber';
import { getProTableDictionary } from 'utils/translation';

import { getGeneColumns } from './geneColumns';

interface OwnProps {
  variantEntity?: VariantEntity;
  isOpen?: boolean;
  toggleModal: (visible: boolean) => void;
}

const GenesModal = ({ variantEntity, isOpen = false, toggleModal }: OwnProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const data = variantEntity?.genes.hits.edges.map((gene: any, index: number) => ({
    key: `${variantEntity?.genes.hits.edges[index].node.symbol}`,
    ...gene.node,
  }));

  return (
    <Modal
      destroyOnClose
      visible={isOpen}
      title={`${intl.get('screen.patientcnv.modal.genes.title')} ${variantEntity?.name
        .split(':')
        .slice(1)
        .join(':')} (${formatDnaLength(variantEntity?.reflen || 0)})`}
      onCancel={() => toggleModal(false)}
      footer={[
        <Button key="close" type="primary" onClick={() => toggleModal(false)}>
          {intl.get('screen.patientcnv.modal.genes.close')}
        </Button>,
      ]}
      centered
      width="90vw"
    >
      <ProTable<ITableGeneEntity>
        tableId="genes_table"
        columns={getGeneColumns()}
        dictionary={getProTableDictionary()}
        dataSource={data}
        headerConfig={{
          itemCount: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            total: data?.length || 0,
          },
        }}
        pagination={{
          current: pageIndex,
          pageSize: pageSize,
          defaultPageSize: pageSize,
          total: data?.length,
          hideOnSinglePage: true,
          responsive: true,
          size: 'small',
        }}
        showSorterTooltip={false}
        onChange={({ current, pageSize }) => {
          setPageIndex(current!);
          setPageSize(pageSize!);
        }}
        size="small"
        bordered
      />
    </Modal>
  );
};

export default GenesModal;
