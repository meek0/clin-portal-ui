import intl from 'react-intl-universal';
import { DefaultOptionType } from 'antd/lib/select';

export const transmissionModes: (DefaultOptionType & {
  color?: string;
})[] = [
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_dominant_de_novo',
    ),
    value: 'autosomal_dominant_de_novo',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_dominant',
    ),
    value: 'autosomal_dominant',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.autosomal_recessive',
    ),
    value: 'autosomal_recessive',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_dominant_de_novo',
    ),
    value: 'x_linked_dominant_de_novo',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_recessive_de_novo',
    ),
    value: 'x_linked_recessive_de_novo',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_dominant',
    ),
    value: 'x_linked_dominant',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.x_linked_recessive',
    ),
    value: 'x_linked_recessive',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.non_carrier_proband',
    ),
    value: 'non_carrier_proband',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_parents_genotype',
    ),
    value: 'unknown_parents_genotype',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_father_genotype',
    ),
    value: 'unknown_father_genotype',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_mother_genotype',
    ),
    value: 'unknown_mother_genotype',
  },
  {
    label: intl.get(
      'modal.variant.interpretation.germline.modeOfTransmission-options.unknown_proband_genotype',
    ),
    value: 'unknown_proband_genotype',
  },
  {
    label: '-',
    value: null,
  },
];

export const classificationCriterias: (DefaultOptionType & {
  color?: string;
})[] = [
  {
    label: 'PVS1',
    value: 'PVS1',
    color: 'red',
  },
  {
    label: 'PS1',
    value: 'PS1',
    color: 'volcano',
  },
  {
    label: 'PS2',
    value: 'PS2',
    color: 'volcano',
  },
  {
    label: 'PS3',
    value: 'PS3',
    color: 'volcano',
  },
  {
    label: 'PS4',
    value: 'PS4',
    color: 'volcano',
  },
  {
    label: 'PM1',
    value: 'PM1',
    color: 'gold',
  },
  {
    label: 'PM2',
    value: 'PM2',
    color: 'gold',
  },
  {
    label: 'PM3',
    value: 'PM3',
    color: 'gold',
  },
  {
    label: 'PM4',
    value: 'PM4',
    color: 'gold',
  },
  {
    label: 'PM5',
    value: 'PM5',
    color: 'gold',
  },
  {
    label: 'PM6',
    value: 'PM6',
    color: 'gold',
  },
  {
    label: 'PP1',
    value: 'PP1',
    color: 'green',
  },
  {
    label: 'PP2',
    value: 'PP2',
    color: 'green',
  },
  {
    label: 'PP3',
    value: 'PP3',
    color: 'green',
  },
  {
    label: 'PP4',
    value: 'PP4',
    color: 'green',
  },
  {
    label: 'PP5',
    value: 'PP5',
    color: 'green',
  },
  {
    label: 'BA1',
    value: 'BA1',
    color: 'geekblue',
  },
  {
    label: 'BS1',
    value: 'BS1',
    color: 'purple',
  },
  {
    label: 'BS2',
    value: 'BS2',
    color: 'purple',
  },
  {
    label: 'BS3',
    value: 'BS3',
    color: 'purple',
  },
  {
    label: 'BS4',
    value: 'BS4',
    color: 'purple',
  },
  {
    label: 'BP1',
    value: 'BP1',
    color: 'blue',
  },
  {
    label: 'BP2',
    value: 'BP2',
    color: 'blue',
  },
  {
    label: 'BP3',
    value: 'BP3',
    color: 'blue',
  },
  {
    label: 'BP4',
    value: 'BP4',
    color: 'blue',
  },
  {
    label: 'BP5',
    value: 'BP5',
    color: 'blue',
  },
  {
    label: 'BP6',
    value: 'BP6',
    color: 'blue',
  },
  {
    label: 'BP7',
    value: 'BP7',
    color: 'blue',
  },
  {
    label: '-',
    value: null,
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
  },
  {
    label: 'OS1',
    value: 'OS1',
    color: 'volcano',
  },
  {
    label: 'OS2',
    value: 'OS2',
    color: 'volcano',
  },
  {
    label: 'OS3',
    value: 'OS3',
    color: 'volcano',
  },
  {
    label: 'OM1',
    value: 'OM1',
    color: 'blue',
  },
  {
    label: 'OM2',
    value: 'OM2',
    color: 'blue',
  },
  {
    label: 'OM3',
    value: 'OM3',
    color: 'blue',
  },
  {
    label: 'OM4',
    value: 'OM4',
    color: 'blue',
  },
  {
    label: 'OP1',
    value: 'OP1',
    color: 'green',
  },
  {
    label: 'OP2',
    value: 'OP2',
    color: 'green',
  },
  {
    label: 'OP3',
    value: 'OP3',
    color: 'green',
  },
  {
    label: 'OP4',
    value: 'OP4',
    color: 'green',
  },
  {
    label: 'SBVS1',
    value: 'SBVS1',
    color: 'purple',
  },
  {
    label: 'SBS1',
    value: 'SBS1',
    color: 'purple',
  },
  {
    label: 'SBS2',
    value: 'SBS2',
    color: 'purple',
  },
  {
    label: 'SBP1',
    value: 'SBP1',
    color: 'geekblue',
  },
  {
    label: 'SBP2',
    value: 'SBP2',
    color: 'geekblue',
  },
];
export const getOncogenicityClassificationCriteriaColor = (value: string) =>
  oncogenicityClassificationCriterias.find((criteria) => criteria.value === value)?.color ||
  undefined;

export const clinicalUtilitys: (DefaultOptionType & {
  color?: string;
})[] = [
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_ia'),
    value: 'category_ia',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_ib'),
    value: 'category_ib',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iic'),
    value: 'category_iic',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iid'),
    value: 'category_iid',
  },
  {
    label: intl.get('modal.variant.interpretation.somatic.clinicalUtility-options.category_iii'),
    value: 'category_iii',
  },
];
