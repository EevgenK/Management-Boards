import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import { selectModalProperties } from '../../redux/modal/modalSelectors';
import { EditCardType } from '../../../../shared/types';

import { editCardSchema } from '../../utils/validation/editCardSchema';

import { editCard } from '../../redux/cards/cardsOperations';
import CardForm from '../shared/CardForm/CardForm';

const EditCardFrom = () => {
  const target = useSelector(selectModalProperties);
  const dispatch = useDispatch<AppDispatch>();

  const initialCard: EditCardType & { boardId: string } = target ?? {
    boardId: '',
    _id: '',
    title: '',
    description: '',
  };

  const handleSubmit = async (card: EditCardType & { boardId: string }) => {
    const { boardId, ...query } = card;
    if (boardId) {
      await dispatch(editCard({ boardId, query }));
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
