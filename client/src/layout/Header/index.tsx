import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authMe } from '../../store/slices/authSlice/fethAuth.ts';
import HeaderNavbar from './HeaderNavbar/index.tsx';

export const Header = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(authMe());
  }, []);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>VibeNet</div>
          </Link>
          <HeaderNavbar />
          <HeaderAuth />
        </div>
      </Container>
    </div>
  );
};
