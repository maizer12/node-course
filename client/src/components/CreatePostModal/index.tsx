import { Input, Modal, Textarea, HTag, Button } from '../../common';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPost, setCreateModal } from '../../store/slices/postsSlice';
import axios, { baseURL } from '../../axios.ts';
import styles from './CreatePostModal.module.scss';
import { Plus } from 'lucide-react';

const CreatePostModal: FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState([]);
  const [imgLink, setImgLink] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { data } = useAppSelector((state) => state.authSlice);

  const switchModal = (active: boolean) => {
    dispatch(setCreateModal(active));
  };

  const loadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const { data } = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImgLink(data.url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  const createPost = async () => {
    try {
      const res = await axios.post('/posts', {
        tags: selected,
        text,
        imageUrl: imgLink,
      });
      const newPost = { ...res.data, user: data.data };
      if (data) {
        dispatch(addPost(newPost));
        switchModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal title="Створити пост:" setClose={switchModal}>
      <HTag tag="h4" className="my-4">
        Название поста:
      </HTag>
      <Input type="field" value={title} setValue={setTitle as (a: string | string[]) => void} />
      <HTag tag="h4" className="my-4">
        Теги для поста:
      </HTag>
      <Input type="tag" value={selected} setValue={setSelected as (a: string | string[]) => void} />
      <HTag tag="h4" className="my-4">
        Опис поста:
      </HTag>
      <Textarea placeholder="Enter text" setValue={setText} value={text} />

      {!!imgLink.length ? (
        <img src={baseURL + imgLink} className={styles.img + ' my-4'} />
      ) : (
        <div className={styles.file + ' my-4'}>
          <Plus />
          <input type="file" accept="image/png, image/jpeg" onChange={(e) => loadFile(e)} />
        </div>
      )}
      <Button className="mt-5" onClick={createPost}>
        Створити пост
      </Button>
    </Modal>
  );
};

export default CreatePostModal;
