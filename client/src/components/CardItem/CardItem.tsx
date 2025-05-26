import { Draggable } from '@hello-pangea/dnd';
import { ICard } from '../../../../shared/types';

import s from './CardItem.module.css';

import CardButtons from '../CardButtons/CardButtons';
export type CardItemProps = {
  card: Pick<ICard, 'boardId' | '_id' | 'title' | 'description'>;
  index: number;
};

const CardItem = ({ card, index }: CardItemProps) => (
  <Draggable draggableId={card._id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`${s.card} ${snapshot.isDragging ? s.dragging : ''}`}
      >
        <h4>{card.title}</h4>
        <p>{card.description}</p>
        <CardButtons
          item={{
            _id: card._id,
            title: card.title,
            description: card.description,
            boardId: card.boardId,
          }}
        />
      </div>
    )}
  </Draggable>
);

export default CardItem;
