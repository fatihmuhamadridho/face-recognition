import { CSSProperties, useCallback, useRef } from 'react';
import { Image, Modal, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';
import Webcam from 'react-webcam';
import { AttendanceService } from 'services';
import { useAuthContext } from '@components/atoms';
import axios from 'axios';
import { geolocation, useQueryClient } from '@libs';
import { UploadService } from 'services/upload/upload';
import { notifications } from '@mantine/notifications';

const styles: { [key: string]: CSSProperties } = {
  root: {},
  header: {
    fontSize: '24px',
    fontWeight: '500'
  },
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

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI: any) {
  const byteString = atob(dataURI?.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const ModalAttendance = () => {
  const queryClient = useQueryClient();
  const webcamRef = useRef<any>(null);

  const { user } = useAuthContext();
  const [opened, setOpened] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    const blob = dataURItoBlob(imageSrc);
    const file = new File([blob], 'screenshot.jpg', { type: blob.type });
    formData.append('image', file);

    try {
      const response = await axios.post(`/api/upload/${user.username}`, formData);

      if (response.status === 200) {
        setImageList([...imageList, ...[response.data.imagePath]]);
        console.log(response.data);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
    }
  }, [imageList, user.username]);

  const onOpen = () => setOpened(true);
  const onClose = async () => {
    imageList.length > 0 && (await UploadService.cancelUpload(imageList));
    setImageList([]);
    setOpened(false);
  };

  // console.log(user.login_token)

  const handleAttendance = async () => {
    const distance: any = await geolocation({
      allowedLatitude: -6.2244171,
      allowedLongitude: 106.6921108
    });

    if (distance >= 100) {
      setImageList([]);
      setOpened(false);
      return notifications.show({
        title: 'Gagal',
        message: 'Your distance is too far from the office',
        color: 'red'
      });
    }

    try {
      const response = await AttendanceService.postAttendance(user?.login_token, {
        status: 'Absen',
        distance: distance,
        images: imageList,
        description: 'Tepat Waktu'
      });
      if (response.status === 200) {
        await queryClient.invalidateQueries(['getOneAttendance']);
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Absensi',
          color: 'green'
        });
        setImageList([]);
        setOpened(false);
      } else {
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Absensi',
          color: 'red'
        });
      }
    } catch (error: any) {
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Absensi',
        color: 'red'
      });
      console.log(error);
    }
  };

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
        <Webcam
          height={400}
          mirrored
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
          width={400}
        />
        <div className="mt-4 flex space-x-4">
          {imageList.length > 0
            && imageList?.map((file: any, index: number) => (
              <Image key={index} src={file} />
            ))}
        </div>

        {imageList.length === 0 && (
          <div className="mt-4 flex space-x-4">
            <Skeleton height={138} width={138} />
            <Skeleton height={138} width={138} />
            <Skeleton height={138} width={138} />
          </div>
        )}

        <Button
          className="mt-4 rounded-[4px]"
          onClick={imageList.length > 2 ? handleAttendance : capture}
          type="button">
          {imageList.length > 2 ? 'Absen' : 'Ambil Foto'}
        </Button>
      </Modal>

      <Button onClick={onOpen} style={styles.button}>
        <Text style={styles.button_head} title="Absen" />
        <Text style={styles.button_subhead} title="Lakukan absensi disini" />
      </Button>
    </>
  );
};

export { ModalAttendance };
