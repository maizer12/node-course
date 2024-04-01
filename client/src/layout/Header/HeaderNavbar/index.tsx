import { FC } from 'react';
import styles from './HeaderNavbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircleMore, Users2 } from 'lucide-react';

const HeaderNavbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <Home />
        Home
      </NavLink>
      <NavLink to="/people">
        <Users2 /> People
      </NavLink>
      <NavLink to="/chats">
        <MessageCircleMore />
        Chats
      </NavLink>
    </nav>
  );
};

export default HeaderNavbar;
