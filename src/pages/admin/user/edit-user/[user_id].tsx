import { Default } from '@components/templates';
import { useRouter } from 'next/router';
import { Button, Input, PasswordInput, Select, TextInput, Textarea } from '@mantine/core';
import { Form, Formik } from 'formik';
import { UserService } from 'services/userService/user';
import { DatePickerInput } from '@mantine/dates';
import { useQueryClient } from '@tanstack/react-query';
import { useGetDetailUser } from 'services/userService';
import * as yup from 'yup';
import { notifications } from '@mantine/notifications';

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

export default function AdminUserEditUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: detailUserData } = useGetDetailUser(Number(router.query.user_id));
  
  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    birth_date: yup.string().required('Birth Date is required'),
    gender: yup.string().required('Gender is required'),
    address: yup.string().required('Address is required'),
    RoleId: yup.string().required('Role is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });

  const handleEditUser = async (payload: UserPayload) => {
    try {
      const response = await UserService.putUser(Number(router.query.user_id), payload);

      if (response.status === 200) {
        console.log(response.data);
        await queryClient.invalidateQueries(['listUsers']);
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Edit User',
          color: 'green'
        });
        router.push('/admin/user');
      } else {
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Edit User',
          color: 'red'
        });
      }
    } catch (error: any) {
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Edit User',
        color: 'red'
      });
      console.error(error);
    }
  };

  return (
    <Default title="Edit User">
      <Formik
        enableReinitialize
        initialValues={{
          username: detailUserData?.username || '',
          password: detailUserData?.password || '',
          first_name: detailUserData?.UserDetail?.first_name || '',
          last_name: detailUserData?.UserDetail?.last_name || '',
          birth_date:
            detailUserData?.UserDetail?.birth_date
            || new Date(),
          gender: detailUserData?.UserDetail?.gender || '',
          address: detailUserData?.username || '',
          RoleId: String(detailUserData?.RoleId) || '0'
        }}
        onSubmit={(values: UserPayload) => handleEditUser(values)}
        validationSchema={validationSchema}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <TextInput
                  className="w-full"
                  error={touched.first_name && errors.first_name}
                  label="First Name"
                  onChange={(e: any) => setFieldValue('first_name', e.target.value)}
                  value={values.first_name}
                />
                <TextInput
                  className="w-full"
                  error={touched.last_name && errors.last_name}
                  label="Last Name"
                  onChange={(e: any) => setFieldValue('last_name', e.target.value)}
                  value={values.last_name}
                />
              </div>
              <div className="flex space-x-4">
                <Select
                  className="w-full"
                  data={[
                    { label: 'pria', value: 'pria' },
                    { label: 'wanita', value: 'wanita' }
                  ]}
                  error={touched.gender && values.gender === "" ? "Gender is required" : ""}
                  label="Gender"
                  onChange={(e: any) => setFieldValue('gender', e)}
                  value={values.gender}
                />
                <DatePickerInput
                  className="w-full"
                  label="Birthday Date"
                  onChange={(e: any) =>
                    setFieldValue('birth_date', e)
                  }
                  value={new Date(values.birth_date)}
                />
              </div>
              <Textarea
                error={touched.address && errors.address}
                label="Address"
                onChange={(e: any) => setFieldValue('address', e.target.value)}
                value={values.address}
              />
              <Input.Wrapper label="Username">
                <Input
                  error={touched.username && errors.username}
                  onChange={(e: any) => setFieldValue('username', e.target.value)}
                  value={values.username}
                />
              </Input.Wrapper>
              <PasswordInput
                error={touched.password && errors.password}
                label="Password"
                onChange={(e: any) => setFieldValue('password', e.target.value)}
                value={values.password}
              />
              <Select
                data={[
                  { label: 'Superadmin', value: '1' },
                  { label: 'Pegawai', value: '2' }
                ]}
                error={touched.RoleId && values.RoleId === '0' ? "Role is required" : ""}
                label="Role"
                onChange={(e: any) => setFieldValue('RoleId', e)}
                value={values.RoleId}
              />
              <Button type="submit" variant="default">
                Edit User
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Default>
  );
}
