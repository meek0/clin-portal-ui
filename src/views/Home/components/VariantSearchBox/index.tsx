import { useState } from 'react';
import intl from 'react-intl-universal';
import { Link, useHistory } from 'react-router-dom';
import { ArrangerApi } from 'api/arranger';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import { isEmpty } from 'lodash';
import OptionItem from 'views/Variants/components/VariantGeneSearch/OptionItem';

import LineStyleIcon from 'components/icons/LineStyleIcon';

import SearchBox from '../SearchBox';

import styles from './index.module.scss';

const VariantSearchBox = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const history = useHistory();

  const formatUrl = (locus: string) => `/variant/entity/${locus}`;

  return (
    <SearchBox
      icon={<LineStyleIcon />}
      title={intl.get('home.variant.search.box.title')}
      searchPlaceholder={intl.get('home.variant.search.box.placeholder')}
      searchLabel={intl.get('home.variant.search.box.label')}
      autoCompleteProps={{
        onChange: async (value) => {
          if (value) {
            const { data } = await ArrangerApi.searchSuggestions(SuggestionType.VARIANTS, value);
            setSuggestions(data?.suggestions ?? []);
          }
        },
        onKeyDown: (e) => {
          if (e.code.toLowerCase() === 'enter' && !isEmpty(suggestions)) {
            history.push(formatUrl(suggestions[0].locus!));
          }
        },
        options: suggestions.map((suggestion) => ({
          label: (
            <Link className={styles.variantSearchBoxLink} to={formatUrl(suggestion.locus!)}>
              <OptionItem
                type={SuggestionType.VARIANTS}
                suggestion={suggestion}
                value={suggestion.locus!}
              />
            </Link>
          ),
          value: suggestion.locus,
        })),
      }}
    />
  );
};

export default VariantSearchBox;
