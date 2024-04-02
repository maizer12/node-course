import { FC, useEffect, useState } from 'react';
import styles from './People.module.scss';
import { AvatarGenerator, HTag } from '../../common';
import { Search } from '../../components';
import axios from '../../axios.ts';

const People: FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get('/users')
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <main className="">
      <HTag tag="h1" className="mb-14 mt-16">
        People
      </HTag>
      <Search />
      <ul className="flex mt-16 gap-4">
        {!!data &&
          data.map((e: any) => (
            <li className={styles['user-card']} key={e._id}>
              <AvatarGenerator text={e.fullName} className="mb-4" />
              <h4>{e.fullName}</h4>
              <p>{e.email}</p>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default People;
