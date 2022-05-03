import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { ArrangerApi } from 'api/arranger';
import { hydrateResults } from 'graphql/models';
import {
  IParticipantResultTree,
  PrescriptionResult,
} from 'graphql/prescriptions/models/Prescription';
import { PRESCRIPTIONS_SEARCH_QUERY } from 'graphql/prescriptions/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OptionItem from './OptionItem';
import intl from 'react-intl-universal';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';

import styles from './index.module.scss';

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: [
      'cid',
      'mrn',
      'patientInfo.cid',
      'patientInfo.ramq',
      'patientInfo.lastNameFirstName',
      'patientInfo.firstName',
      'patientInfo.lastName',
    ].map((key) =>
      generateValueFilter({
        field: key,
        value: [`${search}*`],
      }),
    ),
  });

const PrescriptionAutoComplete = (
  props: Omit<AutoCompleteProps, 'onChange' | 'options' | 'children'>,
) => {
  const [results, setResults] = useState<PrescriptionResult[]>([]);

  return (
    <AutoComplete
      {...props}
      className={cx(styles.prescriptionAutoComplete, props.className)}
      onSearch={async (value) => {
        if (value) {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IParticipantResultTree }>({
            query: PRESCRIPTIONS_SEARCH_QUERY.loc?.source.body,
            variables: { sqon: generateSearchFilter(value) },
          });
          setResults(hydrateResults(data?.data.Prescriptions?.hits?.edges ?? []));
        } else {
          setResults([]);
        }
      }}
      options={results.map((prescription) => ({
        label: (
          <Link
            className={styles.prescriptionOptionLink}
            to={`/prescription/entity/${prescription.cid}`}
          >
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
