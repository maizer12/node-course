import { IUser } from './IUser';

export interface IPost {
  title: String;
  text: String;
  tags: [];
  viewsCount: Number;
  user: IUser;
  imageUrl: String;
}
