import { CSSProperties } from 'react';
import { Modal, Textarea } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';
import { AttendanceService } from 'services';
import { useAuthContext } from '@components/atoms';
import { useQueryClient } from '@tanstack/react-query';
import { geolocation } from '@libs';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { notifications } from '@mantine/notifications';
import { useGetDetailSetting } from 'services/settingService';

const styles: { [key: string]: CSSProperties } = {
  root: {},
  button: {
    display: 'flex',
    textAlign: 'start',
    flexDirection: 'column',
    padding: '24px 32px',
    gap: '4px',
    width: '100%',
    height: '120px',
    background: '#434076',
    borderRadius: '16px',
    color: 'white'
  },
  button_head: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '36px'
  },
  button_subhead: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px'
  }
};

const ModalIzin = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const { data: detailSettingData } = useGetDetailSetting('balitbang');
  const [opened, setOpened] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    description: yup.string().required('Description is required')
  });

  const onOpen = () => setOpened(true);
  const onClose = () => setOpened(false);

  const handleIzin = async (values: any) => {
    const distances = await Promise.all(
      detailSettingData?.Coordinates?.map(async (coordItem: any, coordIndex: number) => {
        const { distance, latitude, longitude }: any = await geolocation({
          allowedLatitude: Number(coordItem?.latitude),
          allowedLongitude: Number(coordItem?.longitude)
        });

        return { distance, latitude, longitude, place_name: coordItem.name };
      })
    );

    const lowestCoordinateDistance = distances.reduce((minDistanceObj, current) => {
      return current.distance < minDistanceObj.distance ? current : minDistanceObj;
    }, distances[0]);

    if (values.description === '') return null;

    try {
      const response = await AttendanceService.postAttendance(user?.login_token, {
        status: 'Izin',
        distance: distances,
        description: values.description
      });

      if (response.status === 200) {
        await queryClient.invalidateQueries(['getOneAttendance']);
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Izin',
          color: 'green'
        });
        onClose();
        console.log(response.data);
      } else {
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Izin',
          color: 'red'
        });
      }
    } catch (error: any) {
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Izin',
        color: 'red'
      });
      console.error(error);
    }
  };

  return (
    <>
      <Modal centered onClose={onClose} opened={opened} size={376}>
        <Formik
          initialValues={{ description: '' }}
          onSubmit={(values: any) => handleIzin(values)}
          validationSchema={validationSchema}>
          {({ values, handleSubmit, setFieldValue, touched, errors }) => (
            <Form className="space-y-4" onSubmit={handleSubmit}>
              <Text>Alasan tidak masuk</Text>
              <Textarea
                error={
                  touched.description && errors.description
                    ? String(errors.description)
                    : ''
                }
                onChange={(e) => setFieldValue('description', e.target.value)}
                value={values.description}
              />
              <Button className="rounded-[4px]" type="submit">
                Izin
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Button onClick={onOpen} style={styles.button}>
        <Text style={styles.button_head} title="Izin" />
        <Text style={styles.button_subhead} title="Bila ingin melakukan izin" />
      </Button>
    </>
  );
};

export { ModalIzin };
