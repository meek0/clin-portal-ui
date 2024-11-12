import { VariantType } from 'graphql/variants/models';
import GermlineInterpretationForm from './GermlineInterpretationForm';
import SomaticInterpretationForm from './SomaticInterpretationForm';

type TInterpretationFormProps = {
  variantType: VariantType;
};

const InterpretationForm = ({ variantType }: TInterpretationFormProps) => {
  const isGermline = variantType === VariantType.GERMLINE;

  return isGermline ? <GermlineInterpretationForm /> : <SomaticInterpretationForm />;
};

export default InterpretationForm;
