import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { storageHelper, styles } from '@libs';
import { useRouter } from 'next/navigation';
import { AuthService, IOnLogin } from 'services';
import { useAuthContext } from '@components/atoms';
import { notification } from '@components/atoms/notification';

import loginBg from '@assets/images/login.png';
import { BackgroundImage, Image, Text, Input } from '@mantine/core';

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
        notification.success('Berhasil login');
        console.log(response);

        if (response.data.data.RoleId === 1) {
          router.push('/admin');
        } else {
          router.push('/employee');
        }
      } else {
        notification.failed('Gagal login');
      }
    } catch (error: any) {
      console.error(error);
      notification.failed('Gagal login');
    }
  };

  return (
    <AuthTemplate title="Login">
      <div
        className={styles(
          'p-4 w-full max-w-[480px]',
          'flex flex-col items-center',
          'bg-white',
          'space-y-2',
          'z-20'
        )}>
        <Image alt="favicon.ico" height={100} src={'favicon.ico'} width={100} />
        <Text
          className={styles('leading-[48px]')}
          color="#1D90F4"
          size={28}
          ta={'center'}>
          ABSENSI PEGAWAI PPNPN BALITBANG HUKUM DAN HAM.
        </Text>
        <div className={styles('w-full', 'flex items-center justify-center')}>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            hideDefaultInput
            initialValues={values}>
            <Input
              className={styles('w-full')}
              name="username"
              onChange={handleChange}
              type="text"
              value={values.username}
            />
            <Input
              className={styles('w-full')}
              name="password"
              onChange={handleChange}
              type="text"
              value={values.password}
            />
          </Form>
        </div>
        <Text size={'md'}>
          Do not have an account?{' '}
          <span
            className={styles('text-red-500', 'cursor-pointer')}
            onClick={() => router.push('/register')}>
            Register
          </span>
        </Text>
      </div>
      <div className={styles('flex items-center justify-center', 'allMobile:hidden')}>
        <Image
          alt="login.png"
          height={330}
          src={'./images/illustrations/login.png'}
          width={508}
        />
      </div>
    </AuthTemplate>
  );
}
