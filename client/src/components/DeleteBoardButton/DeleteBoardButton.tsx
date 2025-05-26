import { useDispatch } from 'react-redux';
import s from './DeleteBoardButton.module.css';
import { AppDispatch } from '../../redux/store';
import CustomButton from '../shared/CustomButton/CustomButton';
import { ImBin } from 'react-icons/im';
import { openModal } from '../../redux/modal/modalSlice';
type BoardTypeProps = { item: string };

const DeleteBoardButton = ({ item }: BoardTypeProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <CustomButton
      type="button"
      onClick={() =>
        dispatch(
          openModal({ type: 'deleteBoard', properties: { boardId: item } }),
        )
      }
      additionalClass={s.button}
    >
      Delete Board <ImBin className={s.icon} />
    </CustomButton>
  );
};

export default DeleteBoardButton;
