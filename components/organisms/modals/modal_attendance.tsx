import { CSSProperties } from 'react';
import { Modal, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';
import Webcam from 'react-webcam';

const styles: { [key: string]: CSSProperties } = {
  root: {},
  header: {
    fontSize: '24px',
    fontWeight: '500'
  },
  button: {
    display: 'flex',
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

const ModalAttendance = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const onOpen = () => setOpened(true);
  const onClose = () => setOpened(false);

  return (
    <>
      <Modal
        centered
        onClose={onClose}
        opened={opened}
        size={550}
        styles={{
          body: {
            // width: '550px',
            height: '674px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }
        }}>
        <Text style={styles.header} title="Silahkan ambil foto terlebih dahulu" />
        <Webcam height={400} mirrored width={400} />
        <div className='mt-4 flex space-x-4'>
          <Skeleton height={138} width={138} />
          <Skeleton height={138} width={138} />
          <Skeleton height={138} width={138} />
        </div>
        <Button className='mt-4 rounded-[4px]'>Absen</Button>
      </Modal>

      <Button onClick={onOpen} style={styles.button}>
        <Text style={styles.button_head} title="Absen" />
        <Text style={styles.button_subhead} title="Lakukan absensi disini" />
      </Button>
    </>
  );
};

export { ModalAttendance };
