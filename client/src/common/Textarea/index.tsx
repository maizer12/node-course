import { FC } from 'react';
import styles from './Textarea.module.scss';

interface IProps {
  placeholder: string;
  setValue: (a: string) => void;
  value: string;
}

export const Textarea: FC<IProps> = ({ placeholder, setValue, value }) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
