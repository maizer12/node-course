import { ReactNode } from 'react';

export interface IModalProps {
  title: string;
  children: ReactNode;
  setClose: (a: boolean) => void;
}
