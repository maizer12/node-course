import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { FC } from 'react';

export const TagsBlock: FC<any> = ({ items, isLoading = true }) => {
  console.log(items);

  return (
    <SideBlock title="Популярні Теги:">
      <List>
        {isLoading
          ? [...Array(5)]
          : !!items &&
            items.map((e: any, i: number) => (
              <a style={{ textDecoration: 'none', color: 'black' }} href={`/tags/${e.title}`}>
                <ListItem key={i} disablePadding>
                  <ListItemButton>
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
                  </ListItemButton>
                </ListItem>
              </a>
            ))}
      </List>
    </SideBlock>
  );
};
