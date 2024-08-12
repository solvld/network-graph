import { useMutation } from '@tanstack/react-query';
import { messagesQuery } from './messagesApi';

export const useSearch = () => {
  return useMutation({
    mutationFn: messagesQuery,
  });
};
