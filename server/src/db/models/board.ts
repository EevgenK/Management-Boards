import { Document, model, Schema } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';

export interface IBoard extends Document {
  hashId: string;
  name: string;
}

const boardSchema = new Schema<IBoard>(
  {
    hashId: { type: String, required: true, unique: true },
    name: { type: String, required: true, min: 5, max: 20 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

boardSchema.post('save', handleValidationError);

export const BoardsCollection = model('Board', boardSchema);
