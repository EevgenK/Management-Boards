import { Document, model, Schema } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';

export interface IBoard extends Document {
  hashId: string;
  name: string;
}

const boardSchema = new Schema<IBoard>({
  hashId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

boardSchema.post('save', handleValidationError);

export default model('Board', boardSchema);
