import { FC, ReactNode } from 'react';
import { Header } from './Header';
import Container from '@mui/material/Container';

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default Layout;
