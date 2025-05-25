import useModal from '../../utils/hooks/useModal';
import CustomButton from '../shared/CustomButton/CustomButton';
import { MdCancel } from 'react-icons/md';
import s from './CancelButton.module.css';

const CancelButton = () => {
  const { handleClose } = useModal();

  return (
    <CustomButton
      additionalClass={s.button}
      type="button"
      onClick={handleClose}
    >
      {' '}
      Cancel <MdCancel className={s.icon} />
    </CustomButton>
  );
};

export default CancelButton;
