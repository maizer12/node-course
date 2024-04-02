import { FC } from 'react';
import styles from './HeaderAuth.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from '../../../store/slices/authSlice';
import { useAppSelector } from '../../../hooks/redux';
import { User } from 'lucide-react';
import cn from 'classnames';
import { AvatarGenerator, Button } from '../../../common';
import { Link } from 'react-router-dom';
import HeaderAuthSkeleton from './HeaderAuthSkeleton';

const HeaderAuth: FC = () => {
  const { data, loading }: any = useAppSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return (
      <div>
        <HeaderAuthSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.buttons}>
      {isAuth ? (
        <>
          <>
            <div className="flex items-center gap-2">
              <AvatarGenerator text={data.data.fullName} className="w-[45px] h-[45px] mr-2" />
              <div className={styles['user-info']}>
                <h4 className={styles.title}>{data.data.fullName}</h4>
                <p className={styles.email}>{data.data.email}</p>
              </div>
              <Button className={cn(styles.btn, 'p-2')} onClick={onClickLogout} size="sm">
                Вийти
              </Button>
            </div>
          </>
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
  );
};

export default HeaderAuth;
