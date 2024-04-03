import styles from './Chat.module.scss';
import { Search } from '../../components';

const ChatSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Search className="mb-6" />
      <h5 className={styles.name}>Favorites</h5>
      <ul className={styles.tags}>
        <li>Global</li>
      </ul>
    </aside>
  );
};

export default ChatSidebar;
