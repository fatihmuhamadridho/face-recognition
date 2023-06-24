import { Default } from '@components/templates';
import { useRouter } from 'next/router';
import { Button, Input, Select, Textarea } from '@mantine/core';
import { Form, Formik } from 'formik';
import { UserService } from 'services/userService/user';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { useGetDetailUser } from 'services/userService';

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
  console.log(detailUserData);

  const handleEditUser = async (payload: UserPayload) => {
    try {
      const { birth_date, ...restPayload } = payload;

      const response = await UserService.putUser(Number(router.query.user_id), {
        birth_date: dayjs(birth_date).format('MM-DD-YYYY'),
        ...restPayload
      });

      if (response.status === 200) {
        console.log(response.data);
        await queryClient.invalidateQueries(['listUsers']);
        router.push('/admin/user');
      }
    } catch (error: any) {
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
            || dayjs(new Date()).format('MM-DD-YYYY'),
          gender: detailUserData?.UserDetail?.gender || '',
          address: detailUserData?.username || '',
          RoleId: String(detailUserData?.RoleId) || '0'
        }}
        onSubmit={(values: UserPayload) => handleEditUser(values)}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <Input.Wrapper className="w-full" label="First Name">
                  <Input
                    onChange={(e: any) => setFieldValue('first_name', e.target.value)}
                    value={values.first_name}
                  />
                </Input.Wrapper>
                <Input.Wrapper className="w-full" label="Last Name">
                  <Input
                    onChange={(e: any) => setFieldValue('last_name', e.target.value)}
                    value={values.last_name}
                  />
                </Input.Wrapper>
              </div>
              <div className="flex space-x-4">
                <Select
                  className="w-full"
                  data={[
                    { label: 'pria', value: 'pria' },
                    { label: 'wanita', value: 'wanita' }
                  ]}
                  label="Gender"
                  onChange={(e: any) => setFieldValue('gender', e)}
                  value={values.gender}
                />
                <DatePickerInput
                  className="w-full"
                  label="Birthday Date"
                  onChange={(e: any) =>
                    setFieldValue('birth_date', dayjs(e).format('MM-DD-YYYY'))
                  }
                  value={new Date(values.birth_date)}
                />
              </div>
              <Textarea
                label="Address"
                onChange={(e: any) => setFieldValue('address', e.target.value)}
                value={values.address}
              />
              <Input.Wrapper label="Username">
                <Input
                  onChange={(e: any) => setFieldValue('username', e.target.value)}
                  value={values.username}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Password">
                <Input
                  onChange={(e: any) => setFieldValue('password', e.target.value)}
                  value={values.password}
                />
              </Input.Wrapper>
              <Select
                data={[
                  { label: 'Superadmin', value: '1' },
                  { label: 'Pegawai', value: '2' }
                ]}
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
