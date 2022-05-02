import { ArrangerApi } from 'api/arranger';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OptionItem from 'views/Variants/components/VariantGeneSearch/OptionItem';
import SearchBox from '../SearchBox';
import intl from 'react-intl-universal';

import styles from './index.module.scss';

const VariantSearchBox = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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
        options: suggestions.map((suggestion) => ({
          label: (
            <Link
              className={styles.variantSearchBoxLink}
              to={`/variant/entity/${suggestion.locus}`}
            >
              <OptionItem type={SuggestionType.VARIANTS} suggestion={suggestion} />
            </Link>
          ),
          value: suggestion.locus,
        })),
      }}
    />
  );
};

export default VariantSearchBox;
