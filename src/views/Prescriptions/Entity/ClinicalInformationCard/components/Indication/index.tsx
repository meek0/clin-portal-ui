import { useGeneralObservationEntity } from 'graphql/prescriptions/actions';

interface IDOwnProps {
  id: string;
}

export const Indication = ({ id }: IDOwnProps) => {
  const { generalObervationValue } = useGeneralObservationEntity(id);
  return <>{generalObervationValue?.valueString}</>;
};
