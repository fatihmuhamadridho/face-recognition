import { storageHelper, styles } from '@libs';
import { Formik } from 'formik';
import { Input, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { AuthService } from 'services/authService/auth';
import { useContext } from 'react';
import { AuthContext } from '@components/atoms/auth/AuthContext';

const LoginForm = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (values: any) => {
    console.log(values);
    try {
      const response = await AuthService.onLogin(values);
      if (response.status === 200) {
        storageHelper.set('access_token', response.data.data.login_token);
        setUser(response.data.data);

        if (response.data.data.RoleId === 1) {
          router.push('/admin');
        } else {
          router.push('/employee');
        }
        console.log(response);
        // router.push('/dashboard');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values: any) => handleLogin(values)}>
      {({ handleSubmit, handleChange, values }) => (
        <form
          className={styles(
            'w-full h-full min-h-[100vh]',
            'flex flex-col items-center justify-center'
          )}
          onSubmit={handleSubmit}>
          <Input
            type={'text'}
            name={'email'}
            onChange={handleChange}
            value={values.email}
          />
          <Input
            type={'text'}
            name={'password'}
            onChange={handleChange}
            value={values.password}
          />
          <Button type="submit" variant={'default'} color="blue">
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
