import { Droppable } from '@hello-pangea/dnd';
import s from './Column.module.css';
import CardItem from '../CardItem/CardItem';
import { ICard } from '../../../../shared/types';
import clsx from 'clsx';
export type ColumnProps = {
  status: 'todo' | 'inprogress' | 'done';
  cards: ICard[];
};
const Column = ({ status, cards }: ColumnProps) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={clsx(
            s.column,
            s[status] ?? '',
            snapshot.isDraggingOver ? s.dragging_over : '',
          )}
        >
          <div className={s.column_title}>{status.toUpperCase()}</div>
          {cards.map((card, index) => (
            <CardItem key={card._id} card={card} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
