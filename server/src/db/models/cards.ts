import { model, Schema, Document } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';

export interface ICard extends Document {
  boardHashId: string;
  title: string;
  description?: string;
  status: {
    type: StringConstructor;
    enum: string[];
    required: boolean;
  };
  order: number;
}

const cardSchema = new Schema<ICard>({
  boardHashId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
    required: true,
  },
  order: { type: Number, required: true },
});
cardSchema.post('save', handleValidationError);

export const CardsCollection = model('Card', cardSchema);
