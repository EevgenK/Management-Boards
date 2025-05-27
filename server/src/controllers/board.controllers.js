import { createBoard, deleteBoardById, getBoard, } from '../services/board.services';
import createHttpError from 'http-errors';
export const createBoardController = async (req, res) => {
    const board = await createBoard(req.body);
    res.json({
        status: 201,
        message: 'Successfully created a board!',
        data: board,
    });
};
export const getBoardController = async (req, res) => {
    const board = await getBoard(req.params.id);
    res.json({
        status: 201,
        message: 'Successfully found a board!',
        data: board,
    });
};
export const deleteBoardController = async (req, res) => {
    const { id } = req.params;
    const board = await deleteBoardById(id);
    if (!board) {
        throw createHttpError(404, 'Board not found');
    }
    res.json({
        status: 204,
        message: `Successfully deleted a board!`,
    });
};
