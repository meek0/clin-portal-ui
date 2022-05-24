import React from 'react';
import Collapse, { CollapsePanel as FUICollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Spin } from 'antd';

type Props = {
  header: React.ReactNode | string;
  children: React.ReactNode;
  bordered?: boolean;
  loading?: boolean;
};

const CollapsePanel = ({
  header,
  children,
  bordered = false,
  loading = false,
}: Props): React.ReactElement => (
  <Spin spinning={loading}>
    <Collapse bordered={bordered} headerBorderOnly defaultActiveKey="1" arrowIcon="caretFilled">
      <FUICollapsePanel header={header} key={`1`}>
        {children}
      </FUICollapsePanel>
    </Collapse>
  </Spin>
);

export default CollapsePanel;
