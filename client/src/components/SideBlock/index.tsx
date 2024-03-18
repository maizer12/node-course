import styles from './SideBlock.module.scss';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const SideBlock: FC<any> = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </div>
  );
};
