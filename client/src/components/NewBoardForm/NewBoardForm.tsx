import { ChangeEvent, FormEvent, useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import s from './NewBoardForm.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';
import { newBoardSchema } from '../../utils/validation/newBoardSchema ';
import { validateYupSchema } from '../../utils/validation/validateYupSchema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createBoard } from '../../redux/board/boardOperations';

const NewBoardForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newBoard, setNewBoard] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewBoard(value);
    setErrors({});
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newBoard.trim();
    const { isValid, errors } = await validateYupSchema(newBoardSchema, {
      name: trimmed,
    });

    if (isValid) {
      await dispatch(createBoard(trimmed));
      setNewBoard('');
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={onHandleSubmit} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name:
      </label>
      <input
        id="name"
        value={newBoard}
        onChange={handleChange}
        name="name"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Type a board name here..."
      />
      {errors && <p className={s.error}>{errors?.name}</p>}

      <CustomButton additionalClass={s.button} type="submit">
        {' '}
        Create <IoCreate className={s.icon} />
      </CustomButton>
    </form>
  );
};

export default NewBoardForm;
