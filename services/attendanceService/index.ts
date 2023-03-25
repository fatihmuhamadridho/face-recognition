import { useQuery } from '@libs';
import { AttendanceService } from './attendance';

export const useGetOneAttendance = (credential: string) => {
  const { data, status, isFetching } = useQuery({
    key: ['getOneAttendance'],
    fetchAction: async () => {
      const response = await AttendanceService.getOneAttendance(credential);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    }
  });

  return { data, status, isFetching };
};
