import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { storageHelper } from '@libs';
import { useRouter } from 'next/navigation';
import { AuthService, IOnLogin } from 'services';
import { useAuthContext } from '@components/atoms';

import { Text } from '@components/atoms/text';
import { Image, PasswordInput, TextInput } from '@mantine/core';
import { Button } from '@components/atoms';
import * as yup from 'yup';
import IMG_Balitbang from '@assets/images/balitbang.png';
import { notifications } from '@mantine/notifications';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthContext();

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });

  const { handleChange, handleSubmit, values, errors, touched } = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values: IOnLogin) => handleLogin(values),
    validationSchema: validationSchema
  });

  const handleLogin = async (values: IOnLogin) => {
    console.log(values);
    try {
      const response = await AuthService.onLogin(values);
      if (response.status === 200) {
        setUser(response.data.data);
        storageHelper?.set('access_token', response.data.data.login_token);
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Login',
          color: 'green'
        });
        console.log(response);

        if (response.data.data.RoleId === 1) {
          router.push('/admin');
        } else {
          router.push('/employee');
        }
      } else {
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Login',
          color: 'red'
        });
      }
    } catch (error: any) {
      console.error(error);
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Login',
        color: 'red'
      });
    }
  };

  return (
    <AuthTemplate title="Login">
      <Form
        className={'z-10 flex w-full max-w-[464px] items-center bg-white p-4'}
        handleSubmit={handleSubmit}
        hideDefaultButton
        hideDefaultInput>
        <div className="flex">
          <Image
            alt="favicon.ico"
            className="w-max"
            height={110}
            radius={16}
            src={'favicon.ico'}
            width={105}
          />
          <Text className="w-[270px]" fw={600} fz={24} ta={'center'}>
            ABSENSI PEGAWAI PPNPN BALITBANG HUKUM DAN HAM.
          </Text>
        </div>
        <div className="!mt-[32px] flex w-full flex-col space-y-1">
          <TextInput
            error={touched.username && errors.username}
            label="Username"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
          <PasswordInput
            error={touched.password && errors.password}
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <div className="!mt-[32px] flex w-full flex-col items-center space-y-1">
          <Button className="w-full" type="submit" variant="default">
            Login
          </Button>
          <Text fw={400} fz={16}>
            Do not have an account?{' '}
            <span
              onClick={() => router.push('/register')}
              style={{ color: '#FF0000', cursor: 'pointer' }}>
              Register
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
