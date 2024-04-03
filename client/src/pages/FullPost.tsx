import { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';

const FullPost = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = params.id;
    axios
      .get('post/' + id)
      .then(({ data }) => {
        setData(data);
        console.log(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl || ''}
        user={data.user}
        createdAt={'12 июня 2022 г.'}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags || []}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
    </>
  );
};

export default FullPost;
