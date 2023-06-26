import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@components/atoms';

import { Text } from '@components/atoms/text';
import { Image, Select } from '@mantine/core';
import { Input, Button } from '@components/atoms';
import IMG_Balitbang from '@assets/images/balitbang.png';
import { useState } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { UserService } from 'services/userService/user';
import { useQueryClient } from '@tanstack/react-query';

interface UserPayload {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string | any;
  gender: string;
  address: string;
  RoleId: number | any;
}

export default function Register() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const { handleChange, handleSubmit, values } = useForm({
    initialValues: {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      birth_date: dayjs(new Date()).format('MM-DD-YYYY'),
      gender: '',
      address: '',
      RoleId: 0
    },
    onSubmit: (values: UserPayload) => handleRegister(values)
  });

  const handleRegister = async (payload: UserPayload) => {
    try {
      const { birth_date, ...restPayload } = payload;

      const response = await UserService.postUser({
        birth_date: dayjs(birth_date).format('MM-DD-YYYY'),
        ...restPayload
      });

      if (response.status === 200) {
        console.log(response.data);
        await queryClient.invalidateQueries(['getOneAttendance']);
        router.push('/');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <AuthTemplate title="Register">
      <Form
        className={'z-10 flex w-full max-w-[464px] items-center bg-white p-4'}
        handleSubmit={handleSubmit}
        hideDefaultButton
        hideDefaultInput>
        <Image
          alt="favicon.ico"
          height={110}
          radius={16}
          src={'favicon.ico'}
          width={105}
        />
        <Text fw={600} fz={24} ta={'center'}>
          ABSENSI PEGAWAI PPNPN BALITBANG HUKUM DAN HAM.
        </Text>
        {step === 0 && (
          <div className="!mt-[32px] flex w-full flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Input
                label="First Name"
                name="first_name"
                onChange={handleChange}
                value={values.first_name}
              />
              <Input
                label="Last Name"
                name="last_name"
                onChange={handleChange}
                value={values.last_name}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select
                className="w-full"
                data={[
                  { label: 'pria', value: 'pria' },
                  { label: 'wanita', value: 'wanita' }
                ]}
                label="Gender"
                name="gender"
                onChange={(e: any) =>
                  handleChange({ target: { name: 'gender', value: e } })
                }
                value={values.gender}
              />
              <DatePickerInput
                className="w-full"
                label="Birthday Date"
                onChange={(e: any) =>
                  handleChange({
                    target: { name: 'birth_date', value: dayjs(e).format('MM-DD-YYYY') }
                  })
                }
                value={new Date(values.birth_date)}
              />
            </div>
            <Input
              label="Address"
              name="address"
              onChange={handleChange}
              value={values.address}
            />
          </div>
        )}

        {step > 0 && (
          <div className="!mt-[32px] flex w-full flex-col space-y-1">
            <div
              className="flex w-fit cursor-pointer items-center space-x-1 border-none p-0"
              onClick={() => setStep(step - 1)}>
              <IconChevronLeft size={12} />
              <Text fz={12} title="Back" />
            </div>
            <Input
              label="Username"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
            <Input
              label="Password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <Select
              data={[
                { label: 'Pegawai', value: '2' }
              ]}
              label="Role"
              name="RoleId"
              onChange={(e: any) =>
                handleChange({ target: { name: 'RoleId', value: e } })
              }
              value={values.RoleId}
            />
          </div>
        )}

        <div className="!mt-[32px] flex w-full flex-col items-center space-y-1">
          {step === 0 && (
            <Button
              className="w-full"
              onClick={() => setStep(step + 1)}
              type="button"
              variant="default">
              Continue
            </Button>
          )}
          {step > 0 && (
            <Button className="w-full" type="submit" variant="default">
              Register
            </Button>
          )}
          <Text fw={400} fz={16}>
            Already have an account?{' '}
            <span
              onClick={() => router.push('/')}
              style={{ color: '#FF0000', cursor: 'pointer' }}>
              Login
            </span>
          </Text>
        </div>
      </Form>
      <div className="flex items-center allMobile:hidden">
        <Image alt="login.png" height={300} src={IMG_Balitbang.src} width={470} />
      </div>
    </AuthTemplate>
  );
}
