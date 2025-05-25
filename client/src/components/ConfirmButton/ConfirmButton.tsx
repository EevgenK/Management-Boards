import { IoCreate } from 'react-icons/io5';
import s from './ConfirmButton.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';

export interface ConfirmButtonProps {
  text: string;
  action?: () => void;
}
const ConfirmButton = ({ text, action }: ConfirmButtonProps) => {
  return (
    <CustomButton additionalClass={s.button} type="submit" onClick={action}>
      {' '}
      {text} <IoCreate className={s.icon} />
    </CustomButton>
  );
};

export default ConfirmButton;
