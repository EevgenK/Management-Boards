import s from './ConfirmButton.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';
import { useSelector } from 'react-redux';
import { selectCardsIsLoading } from '../../redux/cards/cardsSelectors';
import { selectBoardsIsLoading } from '../../redux/board/boardSelectors';

export interface ConfirmButtonProps {
  Icon: React.ComponentType<{ className?: string }>;

  text: string;
  action?: () => void;
}
const ConfirmButton = ({ Icon, text, action }: ConfirmButtonProps) => {
  const isCardsLoading = useSelector(selectCardsIsLoading);
  const isBoardLoading = useSelector(selectBoardsIsLoading);

  return (
    <CustomButton
      additionalClass={s.button}
      type="submit"
      onClick={action}
      disabled={isCardsLoading || isBoardLoading}
    >
      {' '}
      {text} <Icon className={s.icon} />
    </CustomButton>
  );
};

export default ConfirmButton;
