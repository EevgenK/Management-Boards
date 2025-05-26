import { useDispatch, useSelector } from 'react-redux';
import { AddCardType } from '../../../../shared/types';
import { editCardSchema } from '../../utils/validation/editCardSchema';
import CardForm from '../shared/CardForm/CardForm';
import { selectBoard } from '../../redux/board/boardSelectors';
import { AppDispatch } from '../../redux/store';
import { selectModalProperties } from '../../redux/modal/modalSelectors';
import { createCard } from '../../redux/cards/cardsOperations';

const AddCardForm = () => {
  const boardId = useSelector(selectBoard)?.hashId;
  const target = useSelector(selectModalProperties);
  const dispatch = useDispatch<AppDispatch>();

  const initialCard: AddCardType = target ?? {
    boardId: boardId ?? '',
    title: '',
    description: '',
    status: 'todo',
    order: 0,
  };

  const handleSubmit = async (card: AddCardType) => {
    if (boardId) {
      await dispatch(createCard(card));
    }
  };

  return (
    <CardForm
      initialValues={initialCard}
      schema={editCardSchema}
      onSubmit={handleSubmit}
    />
  );
};
export default AddCardForm;
