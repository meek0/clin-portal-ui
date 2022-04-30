/* eslint-disable jsx-a11y/anchor-is-valid */

type LinkCellProps = {
  path: string;
  text: string;
};

const LinkCell = ({ path, text }: LinkCellProps) => <a onClick={() => {}}>{text}</a>;

export default LinkCell;

export const PatientIdCell = ({ id }: { id: string }) => (
  <LinkCell path={`/patient/${id}`} text={id} />
);
export const PrescriptionIdCell = ({ patientId, text }: { patientId: string; text: string }) => (
  <LinkCell path={`/patient/${patientId}/#prescriptions`} text={text} />
);
