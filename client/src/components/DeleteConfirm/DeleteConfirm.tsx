import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../utils/hooks/useModal';
import CancelButton from '../CancelButton/CancelButton';
import ConfirmButton from '../ConfirmButton/ConfirmButton';
import s from './DeleteConfirm.module.css';
import { AppDispatch } from '../../redux/store';
import { selectModalProperties } from '../../redux/modal/modalSelectors';

import { deleteCard } from '../../redux/cards/cardsOperations';
import { toast } from 'react-toastify';
import { ImBin } from 'react-icons/im';
import { deleteBoard } from '../../redux/board/boardOperations';
import { resetCards } from '../../redux/cards/cardsSlice';

interface DeleteConfirmProps {
  type: string;
}

const DeleteConfirm = ({ type }: DeleteConfirmProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleClose } = useModal();

  const modalProps = useSelector(selectModalProperties) as {
    boardId?: string;
    _id?: string;
  } | null;
  const boardId = modalProps?.boardId;
  const targetId = modalProps?._id;

  const onHandleDelete = async () => {
    try {
      if (!boardId) return;

      if (type === 'Card' && targetId) {
        await dispatch(deleteCard({ boardId, _id: targetId })).unwrap();
      } else if (type === 'Board') {
        await dispatch(deleteBoard(boardId)).unwrap();
        dispatch(resetCards());
      }
      toast.success(`${type} was deleted successfully`);
      handleClose();
    } catch (error) {
      toast.error('Something went wrong during deletion');
      console.error(error);
    }
  };
  return (
    <div className={s.delete}>
      <h3 className={s.edit}>Are you shure with deleting this {type}?</h3>
      <div className={s.wrap}>
        <ConfirmButton Icon={ImBin} text="Delete" action={onHandleDelete} />
        <CancelButton />
      </div>
    </div>
  );
};

export default DeleteConfirm;
