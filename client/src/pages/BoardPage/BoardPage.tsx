import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectBoard,
  selectIsEmptyBoard,
  selectIsExited,
} from '../../redux/board/boardSelectors';

import { AppDispatch } from '../../redux/store';
import { fetchCards } from '../../redux/cards/cardsOperations';
import CardsBoard from '../../components/CardsBoard/CardsBoard';
import Container from '../../components/shared/Container/Container';
import BoardName from '../../components/BoardName/BoardName';
import LeaveBoardButton from '../../components/LeaveBoardButton/LeaveBoardButton';
import { resetCards } from '../../redux/cards/cardsSlice';
import DeleteBoardButton from '../../components/DeleteBoardButton/DeleteBoardButton';
import s from './BoardPage.module.css';
import { fetchBoard } from '../../redux/board/boardOperations';
import { enterBoard } from '../../redux/board/boardSlice';

const BoardPage = () => {
  const isExited = useSelector(selectIsExited);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id: pageId } = useParams();
  const boardId = useSelector(selectBoard)?.hashId;
  const existCards = useSelector(selectIsEmptyBoard);
  useEffect(() => {
    dispatch(enterBoard());
  }, [dispatch]);
  useEffect(() => {
    if (!boardId && !pageId) {
      dispatch(resetCards());
      navigate(`/`);
      return;
    }
    if (!boardId && pageId && !isExited) {
      dispatch(fetchBoard(pageId));
    } else if (existCards && boardId) {
      dispatch(fetchCards(boardId));
    }
  }, [boardId, navigate, dispatch, pageId, existCards, isExited]);

  return (
    <section>
      <Container>
        <div className={s.wrap}>
          <BoardName />
          <div className={s.buttons}>
            <LeaveBoardButton />
            <DeleteBoardButton item={boardId ?? ''} />
          </div>
        </div>
        <CardsBoard />
      </Container>
    </section>
  );
};

export default BoardPage;
