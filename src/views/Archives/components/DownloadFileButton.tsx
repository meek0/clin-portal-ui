import { Typography } from 'antd';
import { FhirApi } from 'api/fhir';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';
import intl from 'react-intl-universal';

interface OwnProps {
  fileUrl: string;
  displayName: string;
}

const DownloadFileButton = ({ fileUrl, displayName }: OwnProps) => {
  const dispatch = useDispatch();

  return (
    <Typography.Link
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
    >
      {displayName}
    </Typography.Link>
  );
};

export default DownloadFileButton;
