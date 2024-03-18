import { Button } from '../../common';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from '../../store/slices/authSlice';
import { useAppSelector } from '../../hooks/redux';
import { User } from 'lucide-react';
import cn from 'classnames';

export const Header = () => {
  const { data }: any = useAppSelector((state) => state.authSlice);
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
                {data && (
                  <div className="flex items-center gap-2">
                    <User width={37} height={37} strokeWidth={1} className={styles.icon} />
                    <div>
                      <h4 className={styles.title}>{data.data.fullName}</h4>
                      <p className={styles.email}>{data.data.email}</p>
                    </div>
                    <Button className={cn(styles.btn, 'p-2')} onClick={onClickLogout} size="sm">
                      Вийти
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" className={styles['btn-login']} size="sm">
                    Увійти
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button size="sm">Створити акаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
