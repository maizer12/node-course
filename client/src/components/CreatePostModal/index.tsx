import { Input, Modal } from '../../common';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCreateModal } from '../../store/slices/postsSlice';
import { HTag } from '../../common/HTag';

const CreatePostModal: FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(['papaya']);

  const switchModal = (active: boolean) => {
    dispatch(setCreateModal(active));
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
    </Modal>
  );
};

export default CreatePostModal;
