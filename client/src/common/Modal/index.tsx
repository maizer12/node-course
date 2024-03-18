import { FC } from 'react';
import { IModalProps } from './Modal.types.ts';
import styles from './Modal.module.scss';

export const Modal: FC<IModalProps> = ({ setClose }) => {
  return (
    <div className={styles.main} onClick={() => setClose(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h3 className="text-3xl ">Створити пост:</h3>
      </div>
    </div>
  );
};
