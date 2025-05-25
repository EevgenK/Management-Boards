import { AxiosError } from 'axios';
import { BackendError } from '../../../../shared/types';

export function handleAxiosError(
  err: unknown,
  fallbackMessage = 'Unexpected error',
): BackendError {
  const error = err as AxiosError<BackendError>;

  if (error.response?.data) {
    return error.response.data;
  }

  return {
    statusCode: 500,
    message: fallbackMessage,
  };
}
