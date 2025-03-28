import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { reportSelector } from 'store/reports/selectors';
import { fetchTranscriptsReport } from 'store/reports/thunks';
import { ReportNames } from 'store/reports/types';

type Props = {
  patientId: string;
  variantIds: string[];
  name: ReportNames;
  iconOnly?: boolean;
  tooltipTitle?: string;
  icon: React.ReactElement;
  size: SizeType;
  buttonText?: string;
  disabled?: boolean;
};

const DownloadButton = ({
  size,
  patientId,
  variantIds,
  name,
  iconOnly = false,
  tooltipTitle,
  icon,
  disabled,
  buttonText = intl.get('download.report'),
}: Props) => {
  const dispatch = useDispatch();
  const { loadingIds } = useSelector(reportSelector);
  const loading = loadingIds.includes(variantIds[0]);
  const commonProps = {
    disabled: loading || disabled,
    loading,
    icon,
    size,
    onClick: () => {
      if (name === ReportNames.transcript) {
        dispatch(fetchTranscriptsReport({ patientId, variantIds }));
      }
    },
  };
  return (
    <Tooltip title={tooltipTitle}>
      {iconOnly ? (
        <Button type={'text'} {...commonProps} />
      ) : (
        <Button {...commonProps}>{buttonText}</Button>
      )}
    </Tooltip>
  );
};

export default DownloadButton;
