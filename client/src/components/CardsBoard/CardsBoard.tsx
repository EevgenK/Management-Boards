import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectCardsByStatus } from '../../redux/cards/cardsSelectors';

import Column from '../Column/Column';
import s from './CardsBoard.module.css';
import { selectBoard } from '../../redux/board/boardSelectors';
import { batchUpdateCards } from '../../redux/cards/cardsOperations';
import { updateCardsOptimistically } from '../../redux/cards/cardsSlice';
import { useCallback } from 'react';

const statuses = ['todo', 'inprogress', 'done'] as const;

const CardsBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const boardId = useSelector(selectBoard)?.hashId;
  const cardsByStatus = useSelector(selectCardsByStatus);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;

      const sourceStatus = source.droppableId as (typeof statuses)[number];
      const destStatus = destination.droppableId as (typeof statuses)[number];

      const sourceCards = [...cardsByStatus[sourceStatus]];
      const destCards =
        sourceStatus === destStatus
          ? sourceCards
          : [...cardsByStatus[destStatus]];

      const [movedCard] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, movedCard);
      const fullCards = destCards.map((card, index) => ({
        ...card,
        status: destStatus,
        order: index + 1,
      }));

      if (boardId) {
        dispatch(updateCardsOptimistically(fullCards));
        dispatch(
          batchUpdateCards({
            boardId,
            updatedCards: fullCards.map((card) => ({
              _id: card._id,
              status: card.status,
              order: card.order,
            })),
            previousCards: Object.values(cardsByStatus).flat(),
          }),
        );
      }
    },
    [dispatch, boardId, cardsByStatus],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.board_wrapper}>
        {statuses.map((status) => (
          <Column key={status} status={status} cards={cardsByStatus[status]} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default CardsBoard;
