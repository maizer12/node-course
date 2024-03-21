import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { authRegistration } from '../../store/slices/authSlice/fethAuth.ts';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth } from '../../store/slices/authSlice';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: 'ivan putpckin',
      email: 'vasil@mail.com',
      password: 123456,
    },
  });

  const onSubmit = (data: any) => {
    dispatch(authRegistration(data));
  };

  if (isAuth) {
    navigate('/');
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          {...register('fullName', { required: true })}
          error={!!errors.email}
          helperText={errors.email ? 'Неверно указана почта' : ''}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register('email', { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ })}
          error={!!errors.email}
          helperText={errors.email ? 'Неверно указана почта' : ''}
        />
        <TextField
          {...register('password', { required: true })}
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password}
          helperText={errors.password ? 'Введите пароль' : ''}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
