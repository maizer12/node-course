import { FC } from 'react';
import styles from './UserInfo.module.scss';
import { CircleUserRound } from 'lucide-react';

export const UserInfo: FC<any> = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <div className={styles.images}>
        {!!avatarUrl ? (
          <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
        ) : (
          <CircleUserRound strokeWidth={1} width={45} height={45} />
        )}
      </div>

      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
