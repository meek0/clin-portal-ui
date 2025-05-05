import intl from 'react-intl-universal';
import { DefaultOptionType } from 'antd/lib/select';

export const getTransmissionModes = (): (DefaultOptionType & {
  color?: string;
})[] => [
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_dominant_de_novo',
    ),
    value: 'autosomal_dominant_de_novo',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_dominant',
    ),
    value: 'autosomal_dominant',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_recessive',
    ),
    value: 'autosomal_recessive',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_dominant_de_novo',
    ),
    value: 'x_linked_dominant_de_novo',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_recessive_de_novo',
    ),
    value: 'x_linked_recessive_de_novo',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_dominant',
    ),
    value: 'x_linked_dominant',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_recessive',
    ),
    value: 'x_linked_recessive',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.non_carrier_proband',
    ),
    value: 'non_carrier_proband',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_parents_genotype',
    ),
    value: 'unknown_parents_genotype',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_father_genotype',
    ),
    value: 'unknown_father_genotype',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_mother_genotype',
    ),
    value: 'unknown_mother_genotype',
    title: '',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_proband_genotype',
    ),
    value: 'unknown_proband_genotype',
    title: '',
  },
];

export const classificationCriterias: (DefaultOptionType & {
  color?: string;
})[] = [
  {
    label: 'PVS1',
    value: 'PVS1',
    color: 'red',
    title: '',
  },
  {
    label: 'PS1',
    value: 'PS1',
    color: 'volcano',
    title: '',
  },
  {
    label: 'PS2',
    value: 'PS2',
    color: 'volcano',
    title: '',
  },
  {
    label: 'PS3',
    value: 'PS3',
    color: 'volcano',
    title: '',
  },
  {
    label: 'PS4',
    value: 'PS4',
    color: 'volcano',
    title: '',
  },
  {
    label: 'PM1',
    value: 'PM1',
    color: 'gold',
    title: '',
  },
  {
    label: 'PM2',
    value: 'PM2',
    color: 'gold',
    title: '',
  },
  {
    label: 'PM3',
    value: 'PM3',
    color: 'gold',
    title: '',
  },
  {
    label: 'PM4',
    value: 'PM4',
    color: 'gold',
    title: '',
  },
  {
    label: 'PM5',
    value: 'PM5',
    color: 'gold',
    title: '',
  },
  {
    label: 'PM6',
    value: 'PM6',
    color: 'gold',
    title: '',
  },
  {
    label: 'PP1',
    value: 'PP1',
    color: 'green',
    title: '',
  },
  {
    label: 'PP2',
    value: 'PP2',
    color: 'green',
    title: '',
  },
  {
    label: 'PP3',
    value: 'PP3',
    color: 'green',
    title: '',
  },
  {
    label: 'PP4',
    value: 'PP4',
    color: 'green',
    title: '',
  },
  {
    label: 'PP5',
    value: 'PP5',
    color: 'green',
    title: '',
  },
  {
    label: 'BA1',
    value: 'BA1',
    color: 'geekblue',
    title: '',
  },
  {
    label: 'BS1',
    value: 'BS1',
    color: 'purple',
    title: '',
  },
  {
    label: 'BS2',
    value: 'BS2',
    color: 'purple',
    title: '',
  },
  {
    label: 'BS3',
    value: 'BS3',
    color: 'purple',
    title: '',
  },
  {
    label: 'BS4',
    value: 'BS4',
    color: 'purple',
    title: '',
  },
  {
    label: 'BP1',
    value: 'BP1',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP2',
    value: 'BP2',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP3',
    value: 'BP3',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP4',
    value: 'BP4',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP5',
    value: 'BP5',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP6',
    value: 'BP6',
    color: 'blue',
    title: '',
  },
  {
    label: 'BP7',
    value: 'BP7',
    color: 'blue',
    title: '',
  },
];

export const getClassificationCriteriaColor = (value: string) =>
  classificationCriterias.find((criteria) => criteria.value === value)?.color || undefined;

export const oncogenicityClassificationCriterias: (DefaultOptionType & {
  color?: string;
})[] = [
  {
    label: 'OVS1',
    value: 'OVS1',
    color: 'red',
    title: '',
  },
  {
    label: 'OS1',
    value: 'OS1',
    color: 'volcano',
    title: '',
  },
  {
    label: 'OS2',
    value: 'OS2',
    color: 'volcano',
    title: '',
  },
  {
    label: 'OS3',
    value: 'OS3',
    color: 'volcano',
    title: '',
  },
  {
    label: 'OM1',
    value: 'OM1',
    color: 'blue',
    title: '',
  },
  {
    label: 'OM2',
    value: 'OM2',
    color: 'blue',
    title: '',
  },
  {
    label: 'OM3',
    value: 'OM3',
    color: 'blue',
    title: '',
  },
  {
    label: 'OM4',
    value: 'OM4',
    color: 'blue',
    title: '',
  },
  {
    label: 'OP1',
    value: 'OP1',
    color: 'green',
    title: '',
  },
  {
    label: 'OP2',
    value: 'OP2',
    color: 'green',
    title: '',
  },
  {
    label: 'OP3',
    value: 'OP3',
    color: 'green',
    title: '',
  },
  {
    label: 'OP4',
    value: 'OP4',
    color: 'green',
    title: '',
  },
  {
    label: 'SBVS1',
    value: 'SBVS1',
    color: 'purple',
    title: '',
  },
  {
    label: 'SBS1',
    value: 'SBS1',
    color: 'purple',
    title: '',
  },
  {
    label: 'SBS2',
    value: 'SBS2',
    color: 'purple',
    title: '',
  },
  {
    label: 'SBP1',
    value: 'SBP1',
    color: 'geekblue',
    title: '',
  },
  {
    label: 'SBP2',
    value: 'SBP2',
    color: 'geekblue',
    title: '',
  },
];
export const getOncogenicityClassificationCriteriaColor = (value: string) =>
  oncogenicityClassificationCriterias.find((criteria) => criteria.value === value)?.color ||
  undefined;

export const getClinicalUtilitys = (): (DefaultOptionType & {
  color?: string;
})[] => [
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_ia'),
    value: 'category_ia',
    title: '',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_ib'),
    value: 'category_ib',
    title: '',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iic'),
    value: 'category_iic',
    title: '',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iid'),
    value: 'category_iid',
    title: '',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iii'),
    value: 'category_iii',
    title: '',
  },
];
