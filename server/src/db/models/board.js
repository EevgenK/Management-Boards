import { model, Schema } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';
const boardSchema = new Schema({
    hashId: { type: String, required: true, unique: true },
    name: { type: String, required: true, min: 5, max: 20 },
}, {
    timestamps: true,
    versionKey: false,
});
boardSchema.post('save', handleValidationError);
export const BoardsCollection = model('Board', boardSchema);
