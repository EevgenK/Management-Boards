import { model, Schema } from 'mongoose';
import { handleValidationError } from '../../utils/handleValidationError';
const cardSchema = new Schema({
    boardId: { type: String, required: true },
    title: { type: String, required: true, min: 5, max: 20 },
    description: { type: String, min: 0, max: 100 },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo',
        required: true,
    },
    order: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
cardSchema.post('save', handleValidationError);
export const CardsCollection = model('Card', cardSchema);
