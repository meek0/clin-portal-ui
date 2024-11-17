import { GenericInterpFormFields } from './types';

const getGenericInterpFormInitialValues = () => ({
  [GenericInterpFormFields.PUBMED]: [
    {
      [GenericInterpFormFields.PUBMED_CITATION]: '',
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
