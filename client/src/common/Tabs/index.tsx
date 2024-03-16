import { FC } from 'react';
import { ITabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import cn from 'classnames';

export const Tabs: FC<ITabsProps> = ({ data, value, setTab }) => {
  return (
    <ul className={styles.tabs}>
      {data.map((e) => (
        <li
          className={cn(styles.tab, { [styles.active]: value === e.value })}
          key={e.value}
          onClick={() => setTab(e.value)}
        >
          {e.name}
        </li>
      ))}
    </ul>
  );
};
