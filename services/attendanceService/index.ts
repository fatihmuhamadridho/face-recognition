import { useQuery } from '@libs';
import { AttendanceService } from './attendance';

export const useGetAllAttendance = () => {
  const { data, status, isFetching } = useQuery({
    key: ['getAllAttendance'],
    fetchAction: async () => {
      const response = await AttendanceService.getAllAttendance();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    }
  });

  return { data, status, isFetching };
};


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
