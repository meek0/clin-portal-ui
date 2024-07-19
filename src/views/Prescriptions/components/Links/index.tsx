import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';

import { STATIC_ROUTES } from 'utils/routes';

interface OwnProps {
  prescriptionId: string;
  withDownload?: boolean;
}

const Links = ({ prescriptionId, withDownload = true }: OwnProps) => (
  <Space size="middle">
    {withDownload && (
      <Link
        to={`${STATIC_ROUTES.ARCHIVE_EXPLORATION}?search=${extractServiceRequestId(
          prescriptionId,
        )}`}
        data-cy={`ArchiveLink_${extractServiceRequestId(prescriptionId)}`}
      >
        <Space size={4}>
          <Button icon={<FileTextOutlined />} type="link" size={'small'}>
            {intl.get('links.files')}
          </Button>
        </Space>
      </Link>
    )}
  </Space>
);

export default Links;
