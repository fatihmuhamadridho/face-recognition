import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { storageHelper, styles } from '@libs';
import { useRouter } from 'next/navigation';
import { AuthService, IOnLogin } from 'services';
import { Input, useAuthContext } from '@components/atoms';
import { notification } from '@components/atoms/notification';

import loginBg from '@assets/images/login.png';
import { BackgroundImage } from '@mantine/core';

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
      <BackgroundImage
        className={styles(
          'p-6 w-full h-full min-h-[100vh]',
          'flex items-center justify-center'
        )}
        src={loginBg.src}>
        <div
          className={styles(
            'w-full max-w-[1152px] h-[450px]',
            'bg-white',
            'grid grid-cols-2'
          )}>
          <div className={styles('flex items-center justify-center')}>
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              hideDefaultInput
              initialValues={values}>
              <Input
                name="username"
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              <Input
                name="password"
                onChange={handleChange}
                type="text"
                value={values.password}
              />
            </Form>
          </div>
        </div>
      </BackgroundImage>
    </AuthTemplate>
  );
}
