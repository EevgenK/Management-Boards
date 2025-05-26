import { MdAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openModal } from '../../redux/modal/modalSlice';
import { selectBoard } from '../../redux/board/boardSelectors';
import s from './AddCardButton.module.css';

const AddCardButton = () => {
  const boardId = useSelector(selectBoard)?.hashId;
  const dispatch = useDispatch<AppDispatch>();
  const handleAddCard = () => {
    dispatch(
      openModal({
        type: 'addCard',
        properties: {
          status: 'todo',
          boardId,
          order: 0,
        },
      }),
    );
  };
  return (
    <button
      className={s.add_button}
      onClick={handleAddCard}
      aria-label="Add New Card"
    >
      <MdAddCircle className={s.icon} />
      <span className={s.tooltip}>Add new card</span>
    </button>
  );
};

export default AddCardButton;
