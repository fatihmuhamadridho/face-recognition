import { useQuery } from '@libs';
import { SettingService } from './setting';

export const useGetListSettings = () => {
  const { data, status, isFetching } = useQuery({
    key: ['listSettings'],
    fetchAction: async () => {
      const response = await SettingService.getAllSettings();
      return response;
    },
    select: (data: any) => {
      return data?.data?.data;
    }
  });

  return { data, status, isFetching };
};

export const useGetDetailSetting = (name: string) => {
  const { data, status, isFetching } = useQuery({
    key: ['detailSetting', name],
    fetchAction: async () => {
      const response = await SettingService.getOneSetting(name);
      return response;
    },
    select: (data: any) => {
      return data?.data?.data;
    }
  });

  return { data, status, isFetching };
};