import { Modal } from '../../common';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCreateModal } from '../../store/slices/postsSlice';

const CreatePostModal: FC = () => {
  const dispatch = useAppDispatch();

  const switchModal = (active: boolean) => {
    dispatch(setCreateModal(active));
  };

  return (
    <Modal title="Створити пост:" setClose={switchModal}>
      4
    </Modal>
  );
};

export default CreatePostModal;
