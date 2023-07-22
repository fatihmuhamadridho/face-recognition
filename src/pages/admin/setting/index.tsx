import { Default } from '@components/templates';
import { useGetDetailSetting } from 'services/settingService';
import { Button, Flex, TextInput } from '@mantine/core';
import { Form, Formik } from 'formik';
import { SettingService } from 'services/settingService/setting';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data: detailSettingData } = useGetDetailSetting('balitbang');

  const handleUpdateSetting = async (values: any) => {
    try {
      const response = await SettingService.putSetting({ name: 'balitbang', ...values });

      if (response.status === 200) {
        await queryClient.invalidateQueries(['detailSetting']);
        notifications.show({
          title: "Berhasil",
          message: "Berhasil update geolocation",
          color: "green"
        })
      } else {
        notifications.show({
          title: "Gagal",
          message: "Gagal update geolocation",
          color: "red"
        })
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: "Gagal",
        message: "Gagal update geolocation",
        color: "red"
      })
    }
  };

  return (
    <Default title="Setting">
      <Formik
        enableReinitialize
        initialValues={{
          latitude: detailSettingData?.latitude || '',
          longitude: detailSettingData?.longitude || ''
        }}
        onSubmit={(values: any) => handleUpdateSetting(values)}>
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Flex direction={'column'} gap={4} p={20}>
              <TextInput
                label="Allowed Latitude"
                onChange={(e) => setFieldValue('latitude', e.target.value)}
                value={values.latitude}
              />
              <TextInput
                label="Allowed Longitude"
                onChange={(e) => setFieldValue('longitude', e.target.value)}
                value={values.longitude}
              />
              <Button
                className="mt-8 border-[1px] border-[black] text-black"
                type="submit"
                variant="white">
                Simpan Setting
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Default>
  );
}
