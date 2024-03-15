import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchAllPosts, fetchAllTags, setSort } from '../store/slices/postsSlice';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';

const tabsItems = [
  { name: 'Нові', value: 'new' },
  { name: 'Популярні', value: 'popular' },
];

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, sort } = useSelector((state) => state.postsSlice);
  const { data } = useSelector((state) => state.authSlice);
  const userId = data?.data?._id;

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  useEffect(() => {
    dispatch(fetchAllPosts(sort));
  }, [sort]);

  const clickTab = (value) => {
    dispatch(setSort(value));
  };

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sort} aria-label="basic tabs example">
        {tabsItems.map((e) => (
          <Tab label={e.name} key={e.value} value={e.value} onClick={() => clickTab(e.value)} />
        ))}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.loading
            ? [...Array(5)].map((_, i) => <Post isLoading={true} key={i} />)
            : posts.data.map((e, i) => (
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
        </Grid>
        <Grid xs={4} item>
          {tags.loading ? <TagsBlock isLoading={true} /> : <TagsBlock items={tags.data} isLoading={false} />}
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
        </Grid>
      </Grid>
    </>
  );
};
