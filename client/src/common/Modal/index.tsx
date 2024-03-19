import { FC } from 'react';
import { IModalProps } from './Modal.types.ts';
import styles from './Modal.module.scss';
import { CircleX } from 'lucide-react';

export const Modal: FC<IModalProps> = ({ setClose, title, children }) => {
  return (
    <div className={styles.main} onClick={() => setClose(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-3xl ">{title}</h3>
          <button className={styles.close} onClick={() => setClose(false)}>
            <CircleX width={30} height={30} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
