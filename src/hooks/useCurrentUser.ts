import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCurrentUser = () => {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/current-user');
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
        return null;
      }
    },
  });

  return { isLoading, isError, user };
};
