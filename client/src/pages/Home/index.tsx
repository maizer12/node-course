import { useEffect } from 'react';
import { fetchAllPosts, fetchAllTags } from '../../store/slices/postsSlice/featchPosts.ts';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CreatePostModal from '../../components/CreatePostModal/index.tsx';
import ControlPanel from './ControlPanel/index.tsx';

const Home = () => {
  const dispatch: any = useAppDispatch();
  const { isModalCreate } = useAppSelector((state) => state.postsSlice);
  const location = useLocation();
  const settingParams = qs.parse(location.search.slice(1));

  const { posts, tags, sort } = useSelector((state: any) => state.postsSlice);
  const { data } = useSelector((state: any) => state.authSlice);
  const userId = data?.data?._id;

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  useEffect(() => {
    const params = {
      sort,
      ...settingParams,
    };
    dispatch(fetchAllPosts(params));
  }, [sort, location]);

  return (
    <main className={styles.main}>
      <div>
        <ControlPanel />
        <div className={styles.content}>
          {posts.loading
            ? [...Array(5)].map((_, i) => <Post isLoading={true} key={i} />)
            : posts.data.map((e: any, i: number) => (
                <Post
                  id={e._id}
                  key={i}
                  title={e.title}
                  imageUrl={e.imageUrl || ''}
                  user={e.user}
                  createdAt={'12 июня 2022 г.'}
                  viewsCount={e.viewsCount}
                  commentsCount={3}
                  tags={e.tags}
                  isEditable={userId && userId === e.user._id}
                />
              ))}
        </div>
      </div>
      <div className={styles.sidebar}>
        {tags.loading ? (
          <TagsBlock isLoading={true} />
        ) : (
          <TagsBlock items={tags.data} isLoading={false} active={settingParams.tag} />
        )}
        <CommentsBlock
          items={[
            {
              user: {
                fullName: 'Вася Пупкин',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
              },
              text: 'Это тестовый комментарий',
            },
            {
              user: {
                fullName: 'Иван Иванов',
                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
              },
              text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
            },
          ]}
          isLoading={false}
        />
      </div>
      {isModalCreate && <CreatePostModal />}
    </main>
  );
};

export default Home;
