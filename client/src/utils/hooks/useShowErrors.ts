import { useEffect } from 'react';
import { toast } from 'react-toastify';
type ErrorsMap = Record<string, string | null | undefined>;

export const useShowErrors = (errors: ErrorsMap) => {
  useEffect(() => {
    const errorType = Object.keys(errors).find((key) => !!errors[key]) || null;

    switch (errorType) {
      case 'boardsError':
        toast.error(errors.boardsError || 'Error while loading the Board');
        break;
      case 'cardsError':
        toast.error(errors.cardsError || 'Помилка при завантаженні карток');
        break;
      default:
        break;
    }
  }, [errors]);
};
