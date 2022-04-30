import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Col, Input, Row, Typography } from 'antd';
import { GqlResults } from 'graphql/models';
import { PatientResult } from 'graphql/patients/models/Patient';

import styles from './index.module.scss';

export type PrescriptionResultsContainerProps = {
  searchResults: GqlResults<PatientResult> | null;
};

const { Text } = Typography;

const autoCompleteResults = (data: PatientResult[]) => {
  return data.map((result) => ({
    label: (
      <>
        <Row className={styles.autoCompleteRow}>
          <Col>
            <Text strong className={styles.optionName}>
              {result.lastName.toUpperCase()} {result.firstName}{' '}
              {result.fetus && <i>({intl.get('screen.patient.details.fetus')})</i>}
            </Text>
          </Col>
          <Col>
            <Text className={styles.optionMrn}>
              {intl.get('screen.patientsearch.table.ramq')}: {result.ramq}
            </Text>
          </Col>
        </Row>
      </>
    ),
    value: result.id,
  }));
};

const ContentHeader = ({
  searchResults,
}: PrescriptionResultsContainerProps): React.ReactElement => {
  const [filteredResults, setFilteredResults] = useState<PatientResult[]>([]);

  return (
    <div className={styles.patientContentHeader}>
      <AutoComplete
        allowClear
        autoFocus
        className={styles.autoComplete}
        defaultActiveFirstOption={false}
        onChange={(value) => {
          if (!value) {
            setFilteredResults([]);
            return;
          }
          const searchValues = value.split(' ').map((value: string) => value.toLowerCase());
          const results = searchResults?.data!.filter((patient) => {
            const infoToSearch = [
              patient.cid,
              patient.ramq,
              patient.firstName,
              patient.lastName,
              patient.familyId,
              patient.birthDate,
              patient.mrn,
            ]
              .join(',')
              .toLowerCase();

            return searchValues.some((searchValue: string) => infoToSearch.includes(searchValue));
          });
          setFilteredResults(results!);
        }}
        onSelect={(id: string) => {
          //redirectParent(`/patient/${id}`);
        }}
        getPopupContainer={(trigger) => trigger.parentElement!}
        options={autoCompleteResults(filteredResults)}
      >
        <Input
          placeholder={intl.get('screen.patientsearch.placeholder')}
          prefix={<SearchOutlined />}
          size="large"
        />
      </AutoComplete>
    </div>
  );
};
export default ContentHeader;
