import { ChangeEvent, FormEvent, useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import s from './NewBoardForm.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';

const NewBoardForm = () => {
  const [newBoard, setNewBoard] = useState({ name: '', id: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBoard((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = newBoard.name.trim();
    const trimmedId = newBoard.id.trim();
    if (trimmedName || trimmedId) {
      console.log({ name: trimmedName, id: trimmedId });
      setNewBoard({ name: '', id: '' });
    }
  };
  return (
    <form onSubmit={onHandleSubmit} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name:
      </label>
      <input
        id="name"
        value={newBoard.name}
        onChange={handleChange}
        name="name"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Type a board name here..."
      />
      <label htmlFor="id" className={s.label}>
        Id:
      </label>
      <input
        id="id"
        value={newBoard.id}
        onChange={handleChange}
        name="id"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Type a board ID here..."
      />
      <CustomButton additionalClass={s.button} type="submit">
        {' '}
        Create <IoCreate className={s.icon} />
      </CustomButton>
    </form>
  );
};

export default NewBoardForm;
