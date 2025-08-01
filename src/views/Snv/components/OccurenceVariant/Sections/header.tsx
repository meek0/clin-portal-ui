/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { Rpt } from 'auth/types';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import {
  interpretationListHasInterpretation,
  TChangeInterpretationList,
  TInterpretationList,
} from 'views/Cnv/Exploration/variantColumns';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { TAB_ID } from 'views/Snv/Entity';

import EditIcon from 'components/icons/EditIcon';
import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { ReportNames } from 'store/reports/types';

import InterpretationModal from '../../InterpretationModal';
import ReportButton from '../../Report/DownloadButton';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  patientId: string;
  loadingRpt: boolean;
  rpt: Rpt;
  igvModalCb?: (record: VariantEntity) => void;
  variantSection?: VariantSection;
  changeInterpretationList?: TChangeInterpretationList;
  interpretationList?: TInterpretationList;
}

const Header = ({
  record,
  patientId,
  loadingRpt,
  rpt,
  igvModalCb,
  variantSection,
  changeInterpretationList,
  interpretationList = [],
}: OwnProps) => {
  const [isInterpretationModalOpen, toggleInterpretationModal] = useState(false);
  const sequencing_id = record.donors?.hits?.edges?.[0]?.node?.service_request_id;
  const [hasInterpretation, setHasInterpretation] = useState(false);
  useEffect(() => {
    setHasInterpretation(
      interpretationListHasInterpretation(interpretationList, record.hash, sequencing_id),
    );
  }, [interpretationList, record.hash, sequencing_id]);

  const donor = findDonorById(record?.donors, patientId);

  return (
    <>
      <Space size={24}>
        <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
          <Space className={style.hgvsg}>
            <span className={style.hgvsgLink}>{record?.hgvsg}</span>
            <div style={{ display: 'flex' }}>
              <ExternalLinkIcon height="24" width="24" className="anticon" />
            </div>
          </Space>
        </Link>
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditIcon height="14" width="14" className="anticon" />}
            onClick={() => toggleInterpretationModal(true)}
          >
            {intl.get('interpret')}
          </Button>
          <ReportButton
            icon={<DownloadOutlined width={'16'} height={'16'} />}
            patientId={patientId!}
            data={[record]}
            donor={donor}
            name={ReportNames.transcript}
            size={'small'}
            buttonText={intl.get('screen.patientsnv.drawer.download.report')}
          />
          <Button
            loading={loadingRpt}
            disabled={loadingRpt || !rpt}
            type="default"
            size="small"
            icon={<LineStyleIcon height="16" width="16" className="anticon" />}
            onClick={() => igvModalCb && igvModalCb(record)}
          >
            {intl.get('open.in.igv')}
          </Button>
        </Space>
        <Divider type="vertical" />
        <Space size={12}>
          <Button
            className={style.linkButton}
            type="link"
            target="_blank"
            size="small"
            href={`https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr${record?.chromosome}%3A${record?.start}-${record?.end}`}
          >
            {intl.get('ucsc')}
          </Button>
          {record?.rsnumber && (
            <Button
              className={style.linkButton}
              type="link"
              target="_blank"
              size="small"
              href={`https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=${record.rsnumber}`}
            >
              {intl.get('litvar')}
            </Button>
          )}
        </Space>
      </Space>
      <InterpretationModal
        isOpen={isInterpretationModalOpen}
        toggleModal={toggleInterpretationModal}
        record={record}
        variantSection={variantSection}
        changeInterpretationList={changeInterpretationList}
        hasInterpretation={hasInterpretation}
      />
    </>
  );
};

export default Header;
