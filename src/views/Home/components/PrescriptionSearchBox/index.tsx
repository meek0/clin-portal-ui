import SearchBox from '../SearchBox';
import intl from 'react-intl-universal';
import { SearchOutlined } from '@ant-design/icons';
import PrescriptionAutoComplete from 'components/uiKit/search/PrescriptionAutoComplete';

const PrescriptionSearchBox = () => (
  <SearchBox
    icon={<SearchOutlined />}
    title={intl.get('home.prescription.search.box.title')}
    searchPlaceholder={intl.get('home.prescription.search.box.placeholder')}
    searchLabel={intl.get('home.prescription.search.box.label')}
    customAutoComplete={<PrescriptionAutoComplete />}
  />
);

export default PrescriptionSearchBox;
