import { FC } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { InputProps } from './Input.types';
import styles from './Input.module.scss';

export const Input: FC<InputProps> = ({ type, value, setValue, placeholder = 'Enter text' }) => {
  switch (type) {
    case 'tag':
      return <TagsInput value={value as string[]} onChange={setValue as (tags: string[]) => void} />;
    case 'field':
      return <input className={styles.input} placeholder={placeholder} />;
    default:
      return <></>;
  }
};
