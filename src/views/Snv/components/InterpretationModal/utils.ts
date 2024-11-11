import { GenericInterpFormFields } from './types';

const getGenericInterpFormInitialValues = () => ({
  [GenericInterpFormFields.PUBMED]: [
    {
      [GenericInterpFormFields.PUBMUD_CITATION]: '',
    },
  ],
});

// TODO add correct type and fill initial form values
export const getGermlineInterpFormInitialValues = (interpretation?: any) => {
  return {
    ...getGenericInterpFormInitialValues(),
  };
};

// TODO add correct type and fill initial form values
export const getSimaticInterpFormInitialValues = (interpretation?: any) => {
  return {
    ...getGenericInterpFormInitialValues(),
  };
};
