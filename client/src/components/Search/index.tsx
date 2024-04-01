import { SearchIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './Search.module.scss';

export const Search: FC = () => {
  return (
    <label className={styles.label}>
      <input placeholder="Search" />
      <button>
        <SearchIcon />
      </button>
    </label>
  );
};
