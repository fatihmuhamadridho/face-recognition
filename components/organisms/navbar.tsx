import { styles } from '@libs';
import { Menu } from '@components/molecules';
import { useAuthContext, Text } from '@components/atoms';

const Navbar = () => {
  const { user: userData } = useAuthContext();

  return (
      <div
        className={styles(
          'px-5 w-full min-h-[80px]',
          'bg-[#344293] text-white',
          'flex items-center justify-between',
          'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
        )}>
        <div className={styles('flex items-center', 'space-x-4')}>
          <Text title="PT CIPTA KARYA ABADI" />
        </div>
        <Menu data={userData} />
      </div>

  );
};

export { Navbar };
