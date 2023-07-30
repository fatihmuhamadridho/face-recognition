import { Default } from '@components/templates';
import { useGetListSettings } from 'services/settingService';
import { Accordion, Button, Flex, Paper, TextInput } from '@mantine/core';
import { Form, Formik } from 'formik';
import { SettingService } from 'services/settingService/setting';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { CoordinateService } from 'services/coordinateService/coordinate';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data: listSettingsData }: { data: any[] } = useGetListSettings();

  console.log(listSettingsData)

  const handleUpdateCoordinate = async (values: any) => {
    try {
      const response = await CoordinateService.putCoordinate(values);

      if (response.status === 200) {
        await queryClient.invalidateQueries(['listSettings']);
        notifications.show({
          title: 'Berhasil',
          message: 'Berhasil update geolocation',
          color: 'green'
        });
      } else {
        notifications.show({
          title: 'Gagal',
          message: 'Gagal update geolocation',
          color: 'red'
        });
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Gagal',
        message: 'Gagal update geolocation',
        color: 'red'
      });
    }
  };

  return (
    <Default title="Setting">
      <Paper withBorder>
        <Accordion defaultValue={['0-0']} multiple>
          {listSettingsData?.map((settingItem: any, settingNumber: number) => {
            return settingItem?.Coordinates?.map(
              (coordItem: any, coordNumber: number) => (
                <Accordion.Item
                  key={`${settingNumber}-${coordNumber}`}
                  value={`${settingNumber}-${coordNumber}`}>
                  <Accordion.Control>{coordItem?.name}</Accordion.Control>
                  <Accordion.Panel>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        name: coordItem.name || "",
                        latitude: coordItem?.latitude || '',
                        longitude: coordItem?.longitude || ''
                      }}
                      onSubmit={(values: any) => handleUpdateCoordinate(values)}>
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
                  </Accordion.Panel>
                </Accordion.Item>
              )
            );
          })}
        </Accordion>
      </Paper>
    </Default>
  );
}
