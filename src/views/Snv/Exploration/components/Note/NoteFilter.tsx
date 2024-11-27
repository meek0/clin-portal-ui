import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { MessageFilled, MessageOutlined } from '@ant-design/icons';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Checkbox, Space } from 'antd';
import { FilterConfirmProps, Key } from 'antd/lib/table/interface';

import styles from './NoteCell.module.css';

interface OwnProps {
  confirm: (param?: FilterConfirmProps) => void;
  setFilterList?: (columnKeys: Key[], filter: string) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedFilter?: string[];
  isClear?: boolean;
}

enum NoteOption {
  NONE = 'noNote',
  HASNOTE = 'hasNote',
}

export const noteFilterQuery = () => ({
  content: {
    field: 'note',
    value: ['true'],
  },
  op: 'in',
});

export const noNoteQuery = () => ({
  content: {
    field: 'note',
    value: ['true'],
  },
  op: 'not-in',
});

export const allNoteQuery = () => ({
  content: [
    {
      content: {
        field: 'note',
        value: ['true'],
      },
      op: 'not-in',
    },
    noteFilterQuery(),
  ],
  op: 'or',
});

export const getNoteQuery = (filteredValues: string[]) => {
  if (filteredValues.length === 1) {
    if (filteredValues.includes('hasNote')) {
      return noteFilterQuery();
    } else {
      return noNoteQuery();
    }
  } else if (filteredValues.length > 1) {
    return allNoteQuery();
  }
};

const NoteFilter = ({
  setFilterList,
  selectedKeys,
  confirm,
  setSelectedKeys,
  selectedFilter,
  isClear,
}: OwnProps) => {
  const [selectedOption, setSelectedOption] = useState<React.Key[]>(
    selectedFilter ? selectedFilter : [],
  );
  useEffect(() => {
    setSelectedOption(selectedFilter ? selectedFilter : []);
  }, [selectedFilter]);

  useEffect(() => {
    if (selectedKeys && setSelectedKeys) {
      setSelectedKeys(selectedOption);
    }
  }, [selectedOption]);
  useEffect(() => {
    if (isClear) {
      setSelectedKeys && setSelectedKeys([]);
      confirm && confirm();
    }
  }, [isClear]);

  const handleSelect = (value: string) => {
    if (selectedOption?.includes(value)) {
      setSelectedOption(selectedOption.filter((item: React.Key) => item !== value));
    } else {
      setSelectedOption([value, ...selectedOption]);
    }
  };
  return (
    <>
      <div className={styles.noteFilterContainer}>
        <StackLayout vertical>
          <Space direction="vertical" size={8}>
            <Checkbox
              checked={selectedOption.includes(NoteOption.HASNOTE) ? true : false}
              key={NoteOption.HASNOTE}
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              type="checkbox"
              value={NoteOption.HASNOTE}
            >
              <Space className={styles.optionNote} size={8}>
                <MessageFilled className={styles.hasNote} />
                {intl.get('note.filter.options.hasNote')}
              </Space>
            </Checkbox>
            <Checkbox
              key={NoteOption.NONE}
              checked={selectedOption.includes(NoteOption.NONE) ? true : false}
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              type="checkbox"
              value={NoteOption.NONE}
            >
              <Space className={styles.optionNote} size={8}>
                <MessageOutlined className={styles.noNote} />
                {intl.get('note.filter.options.noNote')}
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
            setFilterList && setFilterList(selectedKeys, 'note');
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

export default NoteFilter;
