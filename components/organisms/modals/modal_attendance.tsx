import { CSSProperties, useCallback, useRef } from 'react';
import { Image, Modal, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';
import Webcam from 'react-webcam';
import { useAuthContext } from '@components/atoms';
import axios from 'axios';
import { geolocation, useQueryClient } from '@libs';
import { UploadService } from 'services/upload/upload';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { AttendanceService } from 'services';
import { useGetDetailSetting } from 'services/settingService';

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
  const { data: detailSettingData } = useGetDetailSetting('balitbang');
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
  }, [imageList, user?.username]);

  const onOpen = () => setOpened(true);
  const onClose = async () => {
    imageList.length > 0 && (await UploadService.cancelUpload(imageList));
    setImageList([]);
    setOpened(false);
  };

  const handleAttendance = async () => {
    let description = '';
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

    const currentTime = dayjs();
    const attendanceStartTime = dayjs().set('hour', 7).set('minute', 0).set('second', 0); // Jam 7 pagi
    const attendanceEndTime = dayjs().set('hour', 20).set('minute', 0).set('second', 0); // Jam 8 malam

    if (
      currentTime.isAfter(attendanceStartTime) &&
      currentTime.isBefore(attendanceEndTime)
    ) {
      if (
        currentTime.isSame(attendanceStartTime) ||
        currentTime.isBefore(dayjs().set('hour', 8).set('minute', 0).set('second', 0))
      ) {
        // Absensi tepat waktu (jam 7 pagi - jam 8 pagi)
        description = 'Anda absen tepat waktu';
        // console.log("Anda absen tepat waktu");
      } else {
        // Absensi terlambat (lewat dari jam 8 pagi - jam 12 malam)
        const lateMinutes = currentTime.diff(
          dayjs().set('hour', 8).set('minute', 0).set('second', 0),
          'minute'
        );
        const lateDescription = `Anda terlambat ${lateMinutes} menit`;
        description = lateDescription;
        // console.log(lateDescription);
      }
    } else {
      // Absensi belum dibuka (jam 12 malam - jam 7 pagi)
      setImageList([]);
      setOpened(false);
      // description = 'Absensi belum dibuka'
      return notifications.show({
        title: 'Gagal',
        message: 'Absensi belum dibuka',
        color: 'orange'
      });
    }

    // if (lowestCoordinateDistance.distance >= 100) {
    //   setImageList([]);
    //   setOpened(false);
    //   return notifications.show({
    //     title: 'Gagal',
    //     message: 'Jarak Anda terlalu jauh dari kantor',
    //     color: 'red'
    //   });
    // }

    try {
      const response = await AttendanceService.postAttendance(user?.login_token, {
        status: 'Absen',
        distance: lowestCoordinateDistance.distance,
        place_name: lowestCoordinateDistance.place_name,
        longitude: lowestCoordinateDistance.longitude,
        latitude: lowestCoordinateDistance.latitude,
        images: imageList,
        description
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
          {imageList.length > 0 &&
            imageList?.map((file: any, index: number) => (
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
