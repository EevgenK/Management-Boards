import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { selectCardsError } from '../../redux/cards/cardsSelectors';
import { selectBoardsError } from '../../redux/board/boardSelectors';
import { ToastContainer, Zoom } from 'react-toastify';

import { useShowErrors } from '../../utils/hooks/useShowErrors';

const Layout = () => {
  const cardsError = useSelector(selectCardsError);
  const boardsError = useSelector(selectBoardsError);
  console.log('LAYOUT:', cardsError);
  useShowErrors({ boardsError, cardsError });
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </>
  );
};
export default Layout;
