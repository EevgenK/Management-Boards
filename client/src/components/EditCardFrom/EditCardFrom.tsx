import s from './EditCardFrom.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import { selectModalProperties } from '../../redux/modal/modalSelectors';
import { EditCardType } from '../../../../shared/types';
import { validateYupSchema } from '../../utils/validation/validateYupSchema';
import { editCardSchema } from '../../utils/validation/editCardSchema';
import { selectBoard } from '../../redux/board/boardSelectors';
import { editCard } from '../../redux/cards/cardsOperations';
import useModal from '../../utils/hooks/useModal';
import CancelButton from '../CancelButton/CancelButton';
import ConfirmButton from '../ConfirmButton/ConfirmButton';

const initialCard = {
  _id: '',
  title: '',
  description: '',
};
const EditCardFrom = () => {
  const boardId = useSelector(selectBoard)?.hashId;
  const target = useSelector(selectModalProperties);
  const [newCard, setNewCard] = useState<EditCardType>(target ?? initialCard);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const dispatch = useDispatch<AppDispatch>();
  const { handleClose } = useModal();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = {
      _id: newCard._id,
      title: newCard.title.trim(),
      description: newCard.description?.trim() ?? '',
    };

    const { isValid, errors } = await validateYupSchema(
      editCardSchema,
      trimmed,
    );
    if (isValid) {
      if (boardId) {
        await dispatch(editCard({ boardId, query: trimmed }));
      }
      setNewCard(initialCard);
      setErrors({});
      handleClose();
    } else {
      setErrors(errors);
    }
  };
  return (
    <form onSubmit={onHandleSubmit} className={s.form}>
      <h3 className={s.edit}>Edit card:</h3>
      <label htmlFor="title" className={s.label}>
        Title:
      </label>
      <input
        id="title"
        value={newCard.title}
        onChange={handleChange}
        name="title"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Type new title here..."
      />
      {errors && <p className={s.error}>{errors?.title}</p>}
      <label htmlFor="description" className={s.label}>
        Description:
      </label>
      <textarea
        rows={4}
        id="description"
        value={newCard.description}
        onChange={handleChange}
        name="description"
        className={s.input}
        autoComplete="off"
        autoFocus
        placeholder="Type new description here..."
      />
      {errors && <p className={s.error}>{errors?.description}</p>}
      <div className={s.wrap}>
        <ConfirmButton text="Save" />
        <CancelButton />
      </div>
    </form>
  );
};

export default EditCardFrom;
