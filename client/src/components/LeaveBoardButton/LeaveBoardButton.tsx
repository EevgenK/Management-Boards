import s from './LeaveBoardButton.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { resetBoard } from '../../redux/board/boardSlice';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { resetCards } from '../../redux/cards/cardsSlice';

const LeaveBoardButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onHandleClick = () => {
    dispatch(resetBoard());
    dispatch(resetCards());
    navigate(`/`, { replace: true });
  };
  return (
    <CustomButton
      type="button"
      onClick={onHandleClick}
      additionalClass={s.button}
      aria-label="Leave the board"
    >
      Leave Board <CiLogout className={s.icon} />
    </CustomButton>
  );
};

export default LeaveBoardButton;
