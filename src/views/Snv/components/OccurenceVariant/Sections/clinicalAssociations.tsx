import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Space, Tag, Tooltip } from 'antd';
import { ITableVariantEntity, OmimEntity } from 'graphql/variants/models';
import { TAB_ID } from 'views/Snv/Entity';
import NoData from 'views/Snv/Entity/NoData';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const ClinicalAssociations = ({ record }: OwnProps) => {
  const genes = record.genes?.hits.edges;
  const omimList: OmimEntity[] = [];

  genes?.forEach((g) => {
    g.node?.omim?.hits.edges.forEach((o) => omimList.push(o.node));
  });

  const sortOminList = omimList.sort((a, b) => a.name.localeCompare(b.name));
  const omimsToShow = sortOminList.slice(0, 3);
  const noData = omimsToShow?.length === 0;
  return (
    <Space direction="vertical">
      <div>
        <Descriptions
          className={`${style.basicBordered} ${style.clinicalAssociations}`}
          bordered
          size="small"
          title={`${intl.get('screen.variantdetails.tab.clinicalAssociations')} (${intl.get(
            'filters.group.genes.omim.name',
          )})`}
          column={1}
        >
          {!noData &&
            omimsToShow.map((o: any) => (
              <Descriptions.Item
                key={o.id}
                label={
                  <Tooltip className={style.omimEllipsis} title={o.name}>
                    <ExternalLink
                      className={style.ominGene}
                      href={`https://www.omim.org/entry/${o.omim_id}`}
                    >
                      {o.name}
                    </ExternalLink>
                  </Tooltip>
                }
              >
                {o.inheritance_code
                  ? o.inheritance_code?.map((i: string) => (
                      <Tooltip key={o.omim_id} title={intl.get(`inheritant.code.${i}`)}>
                        <Tag color={i.includes('?') ? 'default' : 'blue'}>{i}</Tag>
                      </Tooltip>
                    ))
                  : TABLE_EMPTY_PLACE_HOLDER}
              </Descriptions.Item>
            ))}
        </Descriptions>
        {noData && (
          <span className={style.noData}>
            <NoData />
          </span>
        )}
      </div>
      {sortOminList.length > 3 && (
        <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
          <Space size={4}>
            <span className={style.seeAll}>{intl.get('see.more')}</span>
            <ExternalLinkIcon height="14" width="14" className="anticon" />
          </Space>
        </Link>
      )}
    </Space>
  );
};

export default ClinicalAssociations;
