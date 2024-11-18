/* eslint-disable max-len */
import { IconProps } from 'components/icons';

const RqdmAffectedIcon = ({ svgClass = '' }: IconProps) => (
  <svg
    className={svgClass}
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="currentColor"
  >
    <path d="M12 6L6 12L0 6L6 0L12 6Z" fill="#072550" />
  </svg>
);

export default RqdmAffectedIcon;
