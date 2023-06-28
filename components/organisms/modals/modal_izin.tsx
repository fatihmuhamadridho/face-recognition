import { CSSProperties } from 'react';
import { Modal, Textarea } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';
import { AttendanceService } from 'services';
import { useAuthContext } from '@components/atoms';
import { useQueryClient } from '@tanstack/react-query';
import { geolocation } from '@libs';

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
  const [opened, setOpened] = useState<boolean>(false);

  const onOpen = () => setOpened(true);
  const onClose = () => setOpened(false);

  const handleIzin = async () => {
    const distance: any = await geolocation({
      allowedLatitude: -6.2175477,
      allowedLongitude: 106.6715803,
    });

    try {
      const response = await AttendanceService.postAttendance(user?.login_token, {
        status: 'Izin',
        distance: distance,
        description: 'Izin karna sakit'
      });

      if (response.status === 200) {
        await queryClient.invalidateQueries(['getOneAttendance']);
        onClose()
        console.log(response.data)
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal centered onClose={onClose} opened={opened} size={376}>
        <div className="space-y-4">
          <Text>Alasan tidak masuk</Text>
          <Textarea />
          <Button className="rounded-[4px]" onClick={handleIzin} type="button">
            Izin
          </Button>
        </div>
      </Modal>

      <Button onClick={onOpen} style={styles.button}>
        <Text style={styles.button_head} title="Izin" />
        <Text style={styles.button_subhead} title="Bila ingin melakukan izin" />
      </Button>
    </>
  );
};

export { ModalIzin };
