import { Input, Modal, Textarea, HTag } from '../../common';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCreateModal } from '../../store/slices/postsSlice';
import axios, { baseURL } from '../../axios.ts';
import styles from './CreatePostModal.module.scss';
import { Plus } from 'lucide-react';

const CreatePostModal: FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(['papaya']);
  const [imgLink, setImgLink] = useState('');

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

  return (
    <Modal title="Створити пост:" setClose={switchModal}>
      <HTag tag="h4" className="my-4">
        Название поста:
      </HTag>
      <Input type="field" value={selected} setValue={setSelected as (a: string | string[]) => void} />
      <HTag tag="h4" className="my-4">
        Теги для поста:
      </HTag>
      <Input type="tag" value={selected} setValue={setSelected as (a: string | string[]) => void} />
      <HTag tag="h4" className="my-4">
        Опис поста:
      </HTag>
      <Textarea placeholder="Enter text" />
      <div className={styles.file + ' my-4'}>
        <Plus />
        <input type="file" onChange={(e) => loadFile(e)} />
      </div>
      {!!imgLink.length && <img src={baseURL + imgLink} className={styles.img} />}
    </Modal>
  );
};

export default CreatePostModal;
