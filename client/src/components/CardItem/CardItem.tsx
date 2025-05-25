import { Draggable } from '@hello-pangea/dnd';
import { ICard } from '../../../../shared/types';
import { IoCreateSharp } from 'react-icons/io5';
import { ImBin } from 'react-icons/im';
import s from './CardItem.module.css';
export type CardItemProps = {
  card: Pick<ICard, '_id' | 'title' | 'description'>;
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
        <div>{card.title}</div>
        <small>{card.description}</small>
        <div className={s.buttons_wrap}>
          <button className={s.btn} type="button">
            <IoCreateSharp className={s.icon} />
          </button>
          <button className={s.btn} type="button">
            <ImBin className={s.icon} />
          </button>
        </div>
      </div>
    )}
  </Draggable>
);

export default CardItem;
