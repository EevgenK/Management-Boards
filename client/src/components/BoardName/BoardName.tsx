import { useSelector } from 'react-redux';
import s from './BoardName.module.css';
import { selectBoard } from '../../redux/board/boardSelectors';

const BoardName = () => {
  const board = useSelector(selectBoard);
  return (
    <h1 className={s.title}>
      "{board?.name}"{' '}
      <span className={s.superscript}>(id:{board?.hashId})</span>
    </h1>
  );
};

export default BoardName;
