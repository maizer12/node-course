import { FC, useMemo } from 'react';
import styles from './AvatarGenerator.module.scss';

interface IProps {
  text: string;
  className?: string;
}

export const AvatarGenerator: FC<IProps> = ({ text, className }) => {
  const generateRandomColor = () =>
    useMemo(() => {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padEnd(6, '0')}`;
    }, []);

  return (
    <div className={styles.image + ` ${className}`} style={{ backgroundColor: generateRandomColor() }}>
      {text.slice(0, 1)}
    </div>
  );
};
