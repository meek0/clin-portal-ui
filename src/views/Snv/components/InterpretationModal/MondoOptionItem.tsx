import { TMondoAutocompleteHit } from 'api/interpretation/model';

import styles from './MondoOptionItem.module.css';

const InterpretationMondoOptionItem = ({ mondo }: { mondo: TMondoAutocompleteHit }) => {
  return (
    <div>
      {mondo.highlight.name ? (
        <span
          className={styles.selectSearchHighlight}
          dangerouslySetInnerHTML={{ __html: mondo.highlight.name }}
        />
      ) : (
        <span>{mondo._source.name}</span>
      )}{' '}
      {mondo.highlight.mondo_id ? (
        <span className={styles.selectSearchHighlight}>
          (<span dangerouslySetInnerHTML={{ __html: mondo.highlight.mondo_id }} />)
        </span>
      ) : (
        <span>({mondo._source.mondo_id})</span>
      )}
    </div>
  );
};

export default InterpretationMondoOptionItem;
