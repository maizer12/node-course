import { IUser } from '../../../models/IUser';

export interface IAuthState {
  data: null | IUser;
  loading: boolean;
  error: string;
}

export interface IAuthLogin {
  email: string;
  password: string | number;
}
