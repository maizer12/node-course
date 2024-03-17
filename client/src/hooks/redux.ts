import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
