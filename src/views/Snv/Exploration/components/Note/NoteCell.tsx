import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { MessageFilled, MessageOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Tooltip, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { extractOrganizationId } from 'api/fhir/helper';
import { FlagApi } from 'api/flag';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';

import { globalActions } from 'store/global';

import styles from './NoteCell.module.css';

interface OwnProps {
  note: string | null;
  hash: string;
  variantType: string;
}

const NoteCell = ({ note, hash, variantType }: OwnProps) => {
  const dispatch = useDispatch();
  const { prescription, prescriptionId, patientId } = usePrescriptionEntityContext();
  const [newNote, setNewNote] = useState(note);
  const [text, setText] = useState(newNote);
  const [open, setOpen] = useState(false);
  const getOrganizationReference = prescription?.performer?.find((r) =>
    r.reference.includes('Organization'),
  );

  useEffect(() => {
    if (!open) {
      setText(newNote);
    }
  }, [open]);

  useEffect(() => {
    setText(newNote);
  }, [newNote]);

  const handleSave = () => {
    FlagApi.update(
      hash,
      prescriptionId!,
      patientId!,
      extractOrganizationId(getOrganizationReference?.reference!),
      variantType,
      {
        note: text !== '' ? text : null,
      },
    ).then(({ error }) => {
      if (error) {
        dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('flag.error.title'),
            description: intl.get('flag.error.description'),
          }),
        );
      } else {
        setNewNote(text);
        setOpen(false);
      }
    });
  };

  return (
    <div className={styles.noteCell}>
      <Modal
        title={intl.get('note.modal.title')}
        open={open}
        destroyOnClose={true}
        width={800}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setOpen(false);
            }}
          >
            {intl.get('note.modal.cancel')}
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={() => {
              handleSave();
            }}
          >
            {intl.get('note.modal.save')}
          </Button>,
        ]}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Space direction="vertical" style={{ display: 'flex' }}>
          <Typography.Text strong>{`${intl.get('note.modal.label')} :`}</Typography.Text>
          <TextArea
            defaultValue={text ? text : undefined}
            value={text ? text : undefined}
            onChange={(e) => {
              setText(e.target.value);
            }}
            rows={10}
          />
        </Space>
      </Modal>
      {newNote ? (
        <Tooltip title={intl.get('note.options.hasNote')}>
          <Button
            type="text"
            size="small"
            onClick={() => setOpen(true)}
            className={styles.noteButton}
            icon={<MessageFilled className={styles.hasNote} />}
          />
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('note.options.noNote')}>
          <Button
            type="text"
            className={styles.noteButton}
            onClick={() => setOpen(true)}
            icon={<MessageOutlined className={styles.noNote} />}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default NoteCell;
