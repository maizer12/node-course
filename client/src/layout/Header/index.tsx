import { Button } from '../../common';
import AddIcon from '@mui/icons-material/Add';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from '../../store/slices/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>VibeNet</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post" className={styles['add-post']}>
                  <AddIcon />
                </Link>
                <button className={styles.btn} onClick={onClickLogout} color="error">
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" className={styles['btn-login']}>
                    Увійти
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button>Створити акаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
