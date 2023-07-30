import { useQuery } from '@libs';
import { CoordinateService } from './coordinate';

export const useGetListCoordinate = () => {
  const { data, status, isFetching } = useQuery({
    key: ['listCoordinates'],
    fetchAction: async () => {
      const response = await CoordinateService.getAllCoordinate();
      return response;
    },
    select: (data: any) => {
      return data?.data?.data;
    }
  });

  return { data, status, isFetching };
};