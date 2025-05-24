import { model, Schema, Document } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';

export interface ICard extends Document {
  boardId: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
  order: number;
}

const cardSchema = new Schema<ICard>(
  {
    boardId: { type: String, required: true },
    title: { type: String, required: true, min: 5, max: 20 },
    description: { type: String, min: 5, max: 40 },
    status: {
      type: String,
      enum: ['todo', 'inprogress', 'done'],
      default: 'todo',
      required: true,
    },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
cardSchema.post('save', handleValidationError);

export const CardsCollection = model('Card', cardSchema);
