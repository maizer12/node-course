import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';

export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>VibeNet</div>
          </Link>
          <HeaderAuth />
        </div>
      </Container>
    </div>
  );
};
