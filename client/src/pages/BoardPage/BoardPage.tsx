import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectBoard } from '../../redux/board/boardSelectors';
import { selectCards } from '../../redux/cards/cardsSelectors';
import { AppDispatch } from '../../redux/store';
import { fetchCards } from '../../redux/cards/cardsOperations';
import CardsBoard from '../../components/CardsBoard/CardsBoard';
import Container from '../../components/shared/Container/Container';

const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cards = useSelector(selectCards);
  const board = useSelector(selectBoard);

  useEffect(() => {
    if (!board) {
      navigate(`/`);
    } else {
      dispatch(fetchCards(board.hashId));
    }
  }, [board, navigate, dispatch]);

  return (
    <main>
      <Container>
        {cards.length ? <CardsBoard /> : <h2>No cards yet</h2>}
      </Container>
    </main>
  );
};

export default BoardPage;
