import { FC } from 'react';
import styles from './Textarea.module.scss';

interface IProps {
  placeholder: string;
}

export const Textarea: FC<IProps> = ({ placeholder }) => {
  return <textarea className={styles.textarea} placeholder={placeholder} />;
};
