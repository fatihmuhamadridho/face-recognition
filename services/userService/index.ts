import { useQuery } from '@libs';
import { UserService } from './user';

export const useGetListUsers = () => {
  const { data, status, isFetching } = useQuery({
    key: ['listUsers'],
    fetchAction: async () => {
      const response = await UserService.getUsers();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    }
  });

  return { data, status, isFetching };
};
