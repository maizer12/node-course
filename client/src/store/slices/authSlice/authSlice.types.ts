import { IUser } from '../../../models/IUser';

export interface IAuthState {
  data: null | any;
  loading: boolean;
  error: string;
}

export interface IAuthLogin {
  email: string;
  password: string | number;
}
