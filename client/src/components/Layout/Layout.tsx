import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { selectCardsError } from '../../redux/cards/cardsSelectors';
import {
  selectBoard,
  selectBoardsError,
} from '../../redux/board/boardSelectors';
import { ToastContainer, Zoom } from 'react-toastify';

import { useShowErrors } from '../../utils/hooks/useShowErrors';
import Modal from '../shared/Modal/Modal';
import {
  selectModalStatus,
  selectModalType,
} from '../../redux/modal/modalSelectors';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import EditCardFrom from '../EditCardFrom/EditCardFrom';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import AddCardForm from '../AddCardForm/AddCardForm';

const Layout = () => {
  const cardsError = useSelector(selectCardsError);
  const boardsError = useSelector(selectBoardsError);
  const modalOpen = useSelector(selectModalStatus);
  const currentModalType = useSelector(selectModalType);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  useShowErrors({ boardsError, cardsError });

  const checkCurrentModalType = useCallback(() => {
    if (!currentModalType) return null;

    switch (currentModalType) {
      case 'edit':
        return <EditCardFrom />;
      case 'addCard':
        return <AddCardForm />;
      case 'deleteCard':
        return <DeleteConfirm type="Card" />;
      case 'deleteBoard':
        return <DeleteConfirm type="Board" />;

      default:
        return null;
    }
  }, [currentModalType]);

  useEffect(() => {
    if (modalOpen) {
      setModalContent(checkCurrentModalType());
    } else {
      setModalContent(null);
    }
  }, [checkCurrentModalType, modalOpen]);
  const navigate = useNavigate();
  const board = useSelector(selectBoard)?.hashId;

  useEffect(() => {
    if (board) {
      navigate(`/board/${board}`);
    }
  }, [board, navigate]);
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
      {modalOpen && currentModalType && <Modal>{modalContent}</Modal>}
    </>
  );
};
export default Layout;
