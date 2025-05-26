import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import CustomButton from '../shared/CustomButton/CustomButton';
import s from './SearchForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchBoard } from '../../redux/board/boardOperations';
import { useNavigate } from 'react-router-dom';
import { selectBoard } from '../../redux/board/boardSelectors';

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget.input;
    const query = value.trim();
    dispatch(fetchBoard(query));
    setSearch('');
  };

  return (
    <form onSubmit={onHandleSubmit} className={s.search_form}>
      <input
        value={search}
        onChange={onHandleChange}
        name="input"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Enter a board ID here..."
      />
      <CustomButton additionalClass={s.button} type="submit">
        {' '}
        Load <MdDownloadForOffline className={s.icon} />
      </CustomButton>
    </form>
  );
};

export default SearchBar;
