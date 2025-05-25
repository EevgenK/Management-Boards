import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { selectCardsError } from '../../redux/cards/cardsSelectors';
import { selectBoardsError } from '../../redux/board/boardSelectors';
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
      case 'delete':
        return <DeleteConfirm />;

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
