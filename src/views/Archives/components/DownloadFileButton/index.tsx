import { Button } from 'antd';
import { FhirApi } from 'api/fhir';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';
import intl from 'react-intl-universal';
import { DownloadOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

interface OwnProps {
  fileUrl: string;
  displayName: string;
}

const DownloadFileButton = ({ fileUrl, displayName }: OwnProps) => {
  const dispatch = useDispatch();

  return (
    <Button
      type="link"
      className={styles.downloadFileButton}
      onClick={async () => {
        FhirApi.getFileURL(fileUrl)
          .then(({ data }) => {
            window.open(data?.url, '_blank');
            dispatch(
              globalActions.displayNotification({
                type: 'success',
                message: intl.get('notification.success'),
                description: intl.get('notification.success.file.download'),
              }),
            );
          })
          .catch(() => {
            dispatch(
              globalActions.displayNotification({
                type: 'error',
                message: intl.get('notification.error'),
                description: intl.get('notification.error.file.download'),
              }),
            );
          });
      }}
      icon={<DownloadOutlined />}
    >
      {displayName}
    </Button>
  );
};

export default DownloadFileButton;
