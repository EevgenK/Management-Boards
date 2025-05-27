export interface IBoard {
  _id?: string;
  hashId: string;
  name: string;
}

export interface ICard {
  _id: string;
  boardId: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
  order: number;
}

export interface BackendError {
  statusCode: number;
  message: string;
  name?: string;
}

export interface BackendSuccessResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface BatchUpdateCard {
  _id: string;
  status: 'todo' | 'inprogress' | 'done';
  order: number;
}
export interface DeleteCardResponse {
  message: string;
  deletedId: string;
}
export interface GetBoard {
  board: IBoard;
  existCards: boolean;
}
export type EditCardType = Pick<ICard, '_id' | 'title' | 'description'>;
export type AddCardType = Omit<ICard, '_id'>;
