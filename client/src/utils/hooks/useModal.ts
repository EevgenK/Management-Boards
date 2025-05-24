// import { useDispatch, useSelector } from 'react-redux';
// import { useRef, useCallback, useEffect } from 'react';
// import {
//   closeModal,
//   offModalVisible,
//   onModalVisible,
// } from '../../redux/modal/slice';
// import {
//   selectIsVisible,
//   selectModalStatus,
// } from '../../redux/modal/selectors';

// const useModal = () => {
//   const isOpen = useSelector(selectModalStatus);
//   const isVisible = useSelector(selectIsVisible);
//   const dispatch = useDispatch();

//   const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const handleClose = useCallback(() => {
//     dispatch(offModalVisible());
//     closeTimeoutRef.current = setTimeout(() => {
//       dispatch(closeModal());
//       document.body.style.overflow = 'auto';
//     }, 500);
//   }, [dispatch]);

//   const handleOverlayClick = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       if (e.target === e.currentTarget) {
//         handleClose();
//       }
//     },
//     [handleClose],
//   );

//   useEffect(() => {
//     if (isOpen) {
//       openTimeoutRef.current = setTimeout(() => {
//         dispatch(onModalVisible());
//       }, 0);

//       document.body.style.overflow = 'hidden';
//     } else {
//       dispatch(offModalVisible());
//       closeTimeoutRef.current = setTimeout(() => {
//         document.body.style.overflow = 'auto';
//       }, 500);
//     }

//     return () => {
//       if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
//       if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
//     };
//   }, [dispatch, isOpen]);

//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') handleClose();
//     };

//     document.addEventListener('keydown', onKeyDown);
//     return () => {
//       document.removeEventListener('keydown', onKeyDown);
//     };
//   }, [handleClose]);

//   return {
//     isOpen,
//     handleClose,
//     isVisible,
//     handleOverlayClick,
//   };
// };

// export default useModal;
