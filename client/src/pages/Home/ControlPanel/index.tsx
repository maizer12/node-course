import { FC } from 'react';
import { Button, Tabs } from '../../../common';
import { setCreateModal, setSort } from '../../../store/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
//import styles from './ControlPanel.module.scss';

const tabsItems = [
  { name: 'Нові', value: 'new' },
  { name: 'Популярні', value: 'popular' },
];

const ControlPanel: FC = () => {
  const { sort } = useAppSelector((state: any) => state.postsSlice);
  const dispatch: any = useAppDispatch();

  const clickTab = (value: string) => {
    dispatch(setSort(value));
  };

  const openCreateModal = () => {
    dispatch(setCreateModal(true));
  };

  return (
    <div className="flex mb-10 justify-between">
      <Tabs data={tabsItems} value={sort} setTab={clickTab} />
      <Button size="sm" className="p-3 m-1" onClick={openCreateModal}>
        Створити пост
      </Button>
    </div>
  );
};

export default ControlPanel;
