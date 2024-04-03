import { SearchIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './Search.module.scss';

interface IProps {
  className?: string;
}

export const Search: FC<IProps> = ({ className = '' }) => {
  return (
    <label className={`${styles.label}  ${className}`}>
      <input placeholder="Search" />
      <button>
        <SearchIcon />
      </button>
    </label>
  );
};
