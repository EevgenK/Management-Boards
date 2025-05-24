import NewBoardForm from '../../components/NewBoardForm/NewBoardForm';
import Container from '../../components/shared/Container/Container';
import WelcomeDescription from '../../components/WelcomeDescription/WelcomeDescription';
import s from './HomePage.module.css';

const HomePage = () => {
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
