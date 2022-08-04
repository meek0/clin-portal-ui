export type TFormConfig = {
  prescribing_institutions: IListNameValueItem[];
  clinical_signs: {
    default_list: IListNameValueItem[];
    onset_age: IListNameValueItem[];
  };
  paraclinical_exams: {
    default_list: IParaclinicalExamItem[];
  };
  history_and_diagnosis: {
    parental_links: IListNameValueItem[];
    ethnicities: IListNameValueItem[];
  };
};

type IParaclinicalExamItem = IListNameValueItem & {
  extra?: IParaclinicalExamItemExtra;
};

export interface IParaclinicalExamItemExtra {
  type: 'string' | 'multi_select';
  label?: string;
  options?: IListNameValueItem[];
}

interface IListNameValueItem {
  name: string;
  value: string;
}
