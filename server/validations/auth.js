import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Необходимо указать корректный адрес электронной почты').isEmail(),
  body('fullName', 'Полное имя не может быть пустым').trim().isLength({ min: 1 }),
  body('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 }),
  body('avatar', 'Аватар должен быть валидным URL-адресом').optional().isURL(),
];
