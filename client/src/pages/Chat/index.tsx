import { FC } from 'react';
import ChatSidebar from './ChatSidebar';
import styles from './Chat.module.scss';
import ChatContent from './ChatContent';

const Chats: FC = () => {
  return (
    <main className={styles.main}>
      <ChatSidebar />
      <ChatContent />
    </main>
  );
};

export default Chats;
