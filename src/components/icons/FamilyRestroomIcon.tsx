/* eslint-disable max-len */
import cx from 'classnames';

import { IconProps } from '.';

const FamilyRestroomIcon = ({ className = '', width = '24', height = '24' }: IconProps) => (
  <svg
    className={cx('anticon', className)}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 4C16 2.89 16.89 2 18 2C19.11 2 20 2.89 20 4C20 5.11 19.11 6 18 6C16.89 6 16 5.11 16 4ZM20 22V16H22.5L19.5 7H16.5L15.33 10.5H17V22H20ZM12.5 11.5C13.33 11.5 14 10.83 14 10C14 9.17 13.33 8.5 12.5 8.5C11.67 8.5 11 9.17 11 10C11 10.83 11.67 11.5 12.5 11.5ZM5.5 6C6.61 6 7.5 5.11 7.5 4C7.5 2.89 6.61 2 5.5 2C4.39 2 3.5 2.89 3.5 4C3.5 5.11 4.39 6 5.5 6ZM7.5 22V15H9V7H2V15H3.5V22H7.5ZM14 22V18H15V12.5H10V18H11V22H14Z" />
  </svg>
);
export default FamilyRestroomIcon;
