import { useNavigate } from 'react-router-dom';
import NewBoardForm from '../../components/NewBoardForm/NewBoardForm';
import Container from '../../components/shared/Container/Container';
import WelcomeDescription from '../../components/WelcomeDescription/WelcomeDescription';
import s from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectBoard } from '../../redux/board/boardSelectors';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const board = useSelector(selectBoard)?.hashId;
  useEffect(() => {
    if (board) {
      navigate(`/board/${board}`);
    }
  }, [board, navigate]);
  return (
    <section>
      <Container additionalClass={s.home}>
        <WelcomeDescription />
        <NewBoardForm />
      </Container>
    </section>
  );
};

export default HomePage;
