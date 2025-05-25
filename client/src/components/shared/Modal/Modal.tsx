import { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import clsx from 'clsx';

import useModal from '../../../utils/hooks/useModal';
export interface ModalProps {
  children: ReactNode;
}
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children }: ModalProps): ReactElement | null => {
  const { handleClose, isVisible, isOpen, handleOverlayClick } = useModal();

  if (!modalRoot || !isOpen) return null;
  return createPortal(
    <div
      className={clsx(s.overlay, { [s.active]: isVisible })}
      onClick={handleOverlayClick}
    >
      <div className={clsx(s.modal, { [s.active]: isVisible })}>
        <button
          className={s.close_btn}
          onClick={handleClose}
          type="button"
          aria-label="close"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};
export default Modal;
