import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import { selectModalProperties } from '../../redux/modal/modalSelectors';
import { EditCardType } from '../../../../shared/types';

import { editCardSchema } from '../../utils/validation/editCardSchema';
import { selectBoard } from '../../redux/board/boardSelectors';
import { editCard } from '../../redux/cards/cardsOperations';
import CardForm from '../shared/CardForm/CardForm';

const EditCardFrom = () => {
  const boardId = useSelector(selectBoard)?.hashId;
  const target = useSelector(selectModalProperties);
  const dispatch = useDispatch<AppDispatch>();

  const initialCard: EditCardType = target ?? {
    _id: '',
    title: '',
    description: '',
  };

  const handleSubmit = async (card: EditCardType) => {
    if (boardId) {
      await dispatch(editCard({ boardId, query: card }));
    }
  };

  return (
    <CardForm
      initialValues={initialCard}
      schema={editCardSchema}
      onSubmit={handleSubmit}
      isEdit
    />
  );
};

export default EditCardFrom;
