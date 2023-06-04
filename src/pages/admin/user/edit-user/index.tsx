import { useGetListUsers } from 'services/userService';
import { Default } from '@components/templates';
import { useRouter } from 'next/router';
import { Button, Input } from '@mantine/core';

export default function AdminUserEditUser() {
  const router = useRouter();
  const { data: userData } = useGetListUsers();

  console.log(userData);

  return (
    <Default title="Tambah User">
      <div className='flex flex-col space-y-4'>
        <div className="flex space-x-4">
          <Input.Wrapper className='w-full' label="First Name">
            <Input />
          </Input.Wrapper>
          <Input.Wrapper className='w-full' label="Last Name">
            <Input />
          </Input.Wrapper>
        </div>
        <div className="flex space-x-4">
          <Input.Wrapper className='w-full' label="Gender">
            <Input />
          </Input.Wrapper>
          <Input.Wrapper className='w-full' label="Birthday Date">
            <Input />
          </Input.Wrapper>
        </div>
        <Input.Wrapper label="Username">
          <Input />
        </Input.Wrapper>
        <Input.Wrapper label="Password">
          <Input />
        </Input.Wrapper>
        <Button variant='default'>Tambah User</Button>
      </div>
    </Default>
  );
}
