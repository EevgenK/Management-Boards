import { IoCreateSharp } from 'react-icons/io5';
import CustomButton from '../shared/CustomButton/CustomButton';
import s from './CardButtons.module.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openModal } from '../../redux/modal/modalSlice';
import { ICard } from '../../../../shared/types';
import { ImBin } from 'react-icons/im';

export type CardButtonsProps = {
  item: Pick<ICard, 'boardId' | '_id' | 'title' | 'description'>;
};
const CardButtons = ({ item }: CardButtonsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onModalOpen = (type: string) => {
    dispatch(openModal({ type: type, properties: item }));
  };
  return (
    <div className={s.buttons_wrap}>
      <CustomButton
        aria-label="edit card"
        additionalClass={s.btn}
        type="button"
        onClick={() => onModalOpen('edit')}
      >
        <IoCreateSharp className={s.icon} />
      </CustomButton>
      <CustomButton
        aria-label="delete card"
        additionalClass={s.btn}
        type="button"
        onClick={() => onModalOpen('deleteCard')}
      >
        <ImBin className={s.icon} />
      </CustomButton>
    </div>
  );
};

export default CardButtons;
