import { FC } from 'react';
import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';
import cn from 'classnames';

export const Button: FC<IButtonProps> = ({ children, variant, size = '', ...props }) => {
  return (
    <button {...props} className={cn(styles.button, styles[variant || ''], styles[size || ''])}>
      {children}
    </button>
  );
};
