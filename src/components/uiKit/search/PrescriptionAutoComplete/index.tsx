import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { ArrangerApi } from 'api/arranger';
import { hydrateResults } from 'graphql/models';
import {
  AnalysisResult,
  IAnalysisResultTree,
} from 'graphql/prescriptions/models/Prescription';
import { PRESCRIPTIONS_SEARCH_QUERY } from 'graphql/prescriptions/queries';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import OptionItem from './OptionItem';
import intl from 'react-intl-universal';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from './index.module.scss';

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: ['id', 'patient_mrn', 'patient_id'].map((key) =>
      generateValueFilter({
        field: key,
        value: [`${search}*`],
      }),
    ),
  });

const PrescriptionAutoComplete = (
  props: Omit<AutoCompleteProps, 'onChange' | 'options' | 'children'>,
) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const history = useHistory();

  const formatUrl = (cid: string) => `/prescription/entity/${cid}`;

  return (
    <AutoComplete
      {...props}
      className={cx(styles.prescriptionAutoComplete, props.className)}
      onSearch={async (value) => {
        if (value) {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IAnalysisResultTree }>({
            query: PRESCRIPTIONS_SEARCH_QUERY.loc?.source.body,
            variables: { sqon: generateSearchFilter(value) },
          });
          setResults(hydrateResults(data?.data.Analyses?.hits?.edges ?? []));
        } else {
          setResults([]);
        }
      }}
      onKeyDown={(e) => {
        if (e.code.toLowerCase() === 'enter' && !isEmpty(results)) {
          history.push(formatUrl(results[0].cid!));
        }
      }}
      options={results.map((prescription) => ({
        label: (
          <Link className={styles.prescriptionOptionLink} to={formatUrl(prescription.cid!)}>
            <OptionItem data={prescription} />
          </Link>
        ),
        value: prescription.cid,
      }))}
    >
      <Input
        suffix={<SearchOutlined />}
        size="large"
        placeholder={intl.get('home.prescription.search.box.placeholder')}
      />
    </AutoComplete>
  );
};

export default PrescriptionAutoComplete;
