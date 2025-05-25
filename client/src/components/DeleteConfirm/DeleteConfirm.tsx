import useModal from '../../utils/hooks/useModal';
import CancelButton from '../CancelButton/CancelButton';
import ConfirmButton from '../ConfirmButton/ConfirmButton';
import s from './DeleteConfirm.module.css';

const DeleteConfirm = () => {
  const { handleClose } = useModal();
  const onHandleDelete = () => {
    console.log('will delete the card');
    handleClose();
  };
  return (
    <div>
      <h3 className={s.edit}>Are you shure with deleting this card?</h3>
      <div className={s.wrap}>
        <ConfirmButton text="Delete" action={onHandleDelete} />
        <CancelButton />
      </div>
    </div>
  );
};

export default DeleteConfirm;
