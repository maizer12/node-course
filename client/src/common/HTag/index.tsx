import { FC } from 'react';
import { HTagProps } from './HTag.types';
import styles from './HTag.module.scss';
import cn from 'classnames';

export const HTag: FC<HTagProps> = ({ children, tag, className, ...props }) => {
  const getClass = cn(styles[tag], className, styles.title);

  switch (tag) {
    case 'h1':
      return (
        <h1 {...props} className={getClass}>
          {children}
        </h1>
      );
    case 'h4':
      return (
        <h4 {...props} className={getClass}>
          {children}
        </h4>
      );
    default:
      return <></>;
  }
};
