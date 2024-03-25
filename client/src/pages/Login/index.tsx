import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '../../common';
import { authLogin } from '../../store/slices/authSlice/fethAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth } from '../../store/slices/authSlice';

import styles from './Login.module.scss';
import { IAuthLogin } from '../../store/slices/authSlice/authSlice.types';

const Login = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'vasil@mail.com',
      password: 123456,
    },
  });

  const onSubmit = (data: IAuthLogin) => {
    dispatch(authLogin(data));
  };

  if (isAuth) {
    navigate('/');
  }

  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вхід в систему
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email', { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ })}
            className={styles.field}
            label="E-Mail"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? 'Неверно указана почта' : ''}
          />
          <TextField
            {...register('password', { required: true })}
            className={styles.field}
            label="Пароль"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? 'Введите пароль' : ''}
          />
          <Button>Увійти</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
