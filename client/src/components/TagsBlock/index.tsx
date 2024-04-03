import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import Skeleton from '@mui/material/Skeleton';
import styles from './TagsBlock.module.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HTag } from '../../common';

export const TagsBlock: FC<any> = ({ items, isLoading = true, active }) => {
  return (
    <div className={styles.block}>
      <div className="p-4">
        <HTag tag="h4" className={styles.title}>
          Популярні Теги:
        </HTag>
      </div>
      <ul>
        {isLoading
          ? [...Array(5)]
          : !!items &&
            items.map((e: any) => (
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
      </ul>
    </div>
  );
};
