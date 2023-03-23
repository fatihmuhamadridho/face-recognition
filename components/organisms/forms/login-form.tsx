import { styles } from '@libs';
import { Formik } from 'formik';
import { Input, Button } from '@mantine/core';

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values: any) => console.log(values)}>
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
