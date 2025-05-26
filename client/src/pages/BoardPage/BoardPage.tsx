import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectBoard } from '../../redux/board/boardSelectors';
import { selectCards } from '../../redux/cards/cardsSelectors';
import { AppDispatch } from '../../redux/store';
import { fetchCards } from '../../redux/cards/cardsOperations';
import CardsBoard from '../../components/CardsBoard/CardsBoard';
import Container from '../../components/shared/Container/Container';
import BoardName from '../../components/BoardName/BoardName';
import LeaveBoardButton from '../../components/LeaveBoardButton/LeaveBoardButton';
import { resetCards } from '../../redux/cards/cardsSlice';
import DeleteBoardButton from '../../components/DeleteBoardButton/DeleteBoardButton';
import s from './BoardPage.module.css';

const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cards = useSelector(selectCards);
  const board = useSelector(selectBoard);

  useEffect(() => {
    if (!board?.hashId) {
      dispatch(resetCards());
      navigate(`/`);
    } else {
      dispatch(fetchCards(board.hashId));
    }
  }, [board, navigate, dispatch, cards.length]);

  return (
    <section>
      <Container>
        <div className={s.wrap}>
          <BoardName />
          <div className={s.buttons}>
            <LeaveBoardButton />
            <DeleteBoardButton item={board?.hashId ?? ''} />
          </div>
        </div>
        <CardsBoard />
      </Container>
    </section>
  );
};

export default BoardPage;
