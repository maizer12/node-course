import { useEffect, useState } from 'react';
import { Button, Modal, Tabs } from '../../common';
import { fetchAllPosts, fetchAllTags, setSort } from '../../store/slices/postsSlice';

import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useAppDispatch } from '../../hooks/redux';

const tabsItems = [
  { name: 'Нові', value: 'new' },
  { name: 'Популярні', value: 'popular' },
];

export const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const settingParams = qs.parse(location.search.slice(1));

  const dispatch: any = useAppDispatch();
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

  const clickTab = (value: string) => {
    dispatch(setSort(value));
  };
  return (
    <main className={styles.main}>
      <div>
        <div className="flex mb-10 justify-between">
          <Tabs data={tabsItems} value={sort} setTab={clickTab} />
          <Button size="sm" className="p-3 m-1">
            Створити пост
          </Button>
        </div>
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
      {showModal && <Modal setClose={setShowModal} />}
    </main>
  );
};
