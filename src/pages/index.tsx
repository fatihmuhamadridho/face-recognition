import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { storageHelper, styles } from '@libs';
import { useRouter } from 'next/navigation';
import { AuthService, IOnLogin } from 'services';
import { useAuthContext } from '@components/atoms';

import { Text } from '@components/atoms/text';
import { Image } from '@mantine/core';
import { Input, Button } from '@components/atoms';
import IMG_Balitbang from '@assets/images/balitbang.png';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const { handleChange, handleSubmit, values } = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values: IOnLogin) => handleLogin(values)
  });

  const handleLogin = async (values: IOnLogin) => {
    console.log(values);
    try {
      const response = await AuthService.onLogin(values);
      if (response.status === 200) {
        setUser(response.data.data);
        storageHelper.set('access_token', response.data.data.login_token);
        // notification.success('Berhasil login');
        console.log(response);

        if (response.data.data.RoleId === 1) {
          router.push('/admin');
        } else {
          router.push('/employee');
        }
      } else {
        // notification.failed('Gagal login');
      }
    } catch (error: any) {
      console.error(error);
      // notification.failed('Gagal login');
    }
  };

  return (
    <AuthTemplate title="Login">
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
        <div className="!mt-[32px] flex w-full flex-col space-y-1">
          <Input
            label="Username"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
          <Input
            type='text'
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
