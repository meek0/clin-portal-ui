import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Modal } from 'antd';
import { FhirApi } from 'api/fhir';
import { DocsWithTaskInfo } from 'views/Archives';

import style from './index.module.css';

interface CnvCallsModalProps {
  cnvCallsFile?: DocsWithTaskInfo;
  downloadCnvCalls: (fileUrl: string) => void;
  isOpen?: boolean;
  toggleModal: (visible: boolean) => void;
}

const CnvCallsModal = ({
  downloadCnvCalls,
  cnvCallsFile,
  isOpen = false,
  toggleModal,
}: CnvCallsModalProps) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const url = cnvCallsFile?.action.urls.file;

  useEffect(() => {
    if (isOpen && url) {
      FhirApi.getFileURL(url)
        .then(({ data }) => {
          setImgUrl(data?.url);
        })
        .catch(() => {
          setImgUrl(undefined);
        });
    }
  }, [isOpen, url]);

  return (
    <Modal
      width="90vw"
      open={isOpen}
      title={intl.get('screen.patientcnv.cnv_calls.modal.title', {
        sequencingRequestId: cnvCallsFile?.srRef,
      })}
      onCancel={() => toggleModal(false)}
      cancelButtonProps={{ hidden: true }}
      onOk={() => cnvCallsFile && downloadCnvCalls(cnvCallsFile.action.urls.file)}
      okText={intl.get('screen.patientcnv.cnv_calls.download')}
      className={style.modal}
      wrapClassName={style.modalWrapper}
    >
      <div className={style.imageWrapper}>
        <img src={imgUrl} />
      </div>
    </Modal>
  );
};

export default CnvCallsModal;
