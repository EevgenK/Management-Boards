import s from './LeaveBoardButton.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { resetBoard } from '../../redux/board/boardSlice';
import { CiLogout } from 'react-icons/ci';

const LeaveBoardButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <CustomButton
      type="button"
      onClick={() => dispatch(resetBoard())}
      additionalClass={s.button}
    >
      Leave Board <CiLogout className={s.icon} />
    </CustomButton>
  );
};

export default LeaveBoardButton;
