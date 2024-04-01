import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import axios from '../../axios.ts';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { baseURL } from '../../axios';
import { CircleX, Edit } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { deletePost } from '../../store/slices/postsSlice/index.ts';

export const Post: FC<any> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }
  const onClickRemove = async () => {
    try {
      await axios.delete('/posts/' + id);
      dispatch(deletePost(id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={clsx(styles.root, 'mb-10 pb-4', { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <Edit className="text-black" />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <CircleX className="text-black" />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Link to={`/post/${id}`} className={clsx(styles.image, 'mb-2', { [styles.imageFull]: isFullPost })}>
          <img src={baseURL + imageUrl} alt={title} />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/post/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name: string) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
