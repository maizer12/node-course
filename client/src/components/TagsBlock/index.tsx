import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import Skeleton from '@mui/material/Skeleton';
import styles from './TagsBlock.module.scss';
import cn from 'classnames';

import { SideBlock } from '../SideBlock';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const TagsBlock: FC<any> = ({ items, isLoading = true, active }) => {
  return (
    <SideBlock title="Популярні Теги:">
      <List>
        {isLoading
          ? [...Array(5)]
          : !!items &&
            items.map((e: any, i: number) => (
              <Link
                style={{ textDecoration: 'none' }}
                to={`/?tag=${e.title}`}
                className={active === e.title ? styles.active : ''}
                key={e.title}
              >
                <li className={styles.item}>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <p className="flex justify-between w-full">
                      {e.title} <span>{e.count}</span>
                    </p>
                  )}
                </li>
              </Link>
            ))}
      </List>
    </SideBlock>
  );
};
