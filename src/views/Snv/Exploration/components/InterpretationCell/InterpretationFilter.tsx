import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Checkbox, Space } from 'antd';
import { FilterConfirmProps, Key } from 'antd/lib/table/interface';

import styles from './InterpretationCell.module.css';

interface OwnProps {
  confirm: (param?: FilterConfirmProps) => void;
  setFilterList?: (columnKeys: Key[], filter: string) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedFilter?: string[];
  isClear?: boolean;
}

enum InterpretationOption {
  NONE = 'noInterpretation',
  HASINTERPRETATION = 'hasInterpretation',
}

export const interpretationFilterQuery = () => ({
  content: {
    field: 'interpretation',
    value: ['true'],
  },
  op: 'in',
});

export const noInterpretationQuery = () => ({
  content: {
    field: 'interpretation',
    value: ['true'],
  },
  op: 'not-in',
});

export const allInterpretationQuery = () => ({
  content: [
    {
      content: {
        field: 'interpretation',
        value: ['true'],
      },
      op: 'not-in',
    },
    interpretationFilterQuery(),
  ],
  op: 'or',
});

export const getInterpretationQuery = (filteredValues: string[]) => {
  if (filteredValues.length === 1) {
    if (filteredValues.includes('hasInterpretation')) {
      return interpretationFilterQuery();
    } else {
      return noInterpretationQuery();
    }
  } else if (filteredValues.length > 1) {
    return allInterpretationQuery();
  }
};

const InterpretationFilter = ({
  setFilterList,
  selectedKeys,
  confirm,
  setSelectedKeys,
  selectedFilter,
  isClear,
}: OwnProps) => {
  const [selectedOption, setSelectedOption] = useState<React.Key[]>(selectedFilter || []);
  useEffect(() => {
    setSelectedOption(selectedFilter || []);
  }, [selectedFilter]);

  useEffect(() => {
    if (isClear) {
      setSelectedKeys?.([]);
      confirm?.();
    }
  }, [isClear]);

  const handleSelect = (value: string) => {
    if (selectedOption?.includes(value)) {
      setSelectedOption(selectedOption.filter((item: React.Key) => item !== value));
      setSelectedKeys(selectedOption.filter((item: React.Key) => item !== value));
    } else {
      setSelectedOption([value, ...selectedOption]);
      setSelectedKeys([value, ...selectedOption]);
    }
  };
  return (
    <>
      <div className={styles.interpretationFilterContainer}>
        <StackLayout vertical>
          <Space direction="vertical" size={8}>
            <Checkbox
              checked={selectedOption.includes(InterpretationOption.HASINTERPRETATION)}
              key={InterpretationOption.HASINTERPRETATION}
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              type="checkbox"
              value={InterpretationOption.HASINTERPRETATION}
            >
              <Space className={styles.optionInterpretation} size={8}>
                <ThunderboltFilled className={styles.hasInterpretation} />
                {intl.get('interpretation_Cell.filter.options.hasInterpretation')}
              </Space>
            </Checkbox>
            <Checkbox
              key={InterpretationOption.NONE}
              checked={selectedOption.includes(InterpretationOption.NONE)}
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              type="checkbox"
              value={InterpretationOption.NONE}
            >
              <Space className={styles.optionInterpretation} size={8}>
                <ThunderboltOutlined className={styles.noInterpretation} />
                {intl.get('interpretation_Cell.filter.options.none')}
              </Space>
            </Checkbox>
          </Space>
        </StackLayout>
      </div>

      <StackLayout className={styles.filterFooter} horizontal>
        <Button
          className={styles.resetButton}
          onClick={() => setSelectedOption([])}
          size="small"
          type="link"
        >
          {intl.get('assignment.filter.actions.reset')}
        </Button>
        <Button
          onClick={() => {
            setFilterList?.(selectedKeys, 'interpretation');
            confirm();
          }}
          size="small"
          type="primary"
        >
          {intl.get('assignment.filter.actions.ok')}
        </Button>
      </StackLayout>
    </>
  );
};

export default InterpretationFilter;
