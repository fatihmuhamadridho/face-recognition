import { Form, useForm } from '@components/molecules';
import { AuthTemplate } from '@components/templates';
import { storageHelper, styles } from '@libs';
import { useRouter } from 'next/navigation';
import { AuthService, IOnLogin } from 'services';
import { useAuthContext } from '@components/atoms';
import { notification } from '@components/atoms/notification';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const { handleChange, handleSubmit, values } = useForm({
    initialValues: {
      email: '',
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
          'w-full h-full min-h-[100vh]',
          'flex items-center justify-center'
        )}>
        <Form
          initialValues={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </AuthTemplate>
  );
}
