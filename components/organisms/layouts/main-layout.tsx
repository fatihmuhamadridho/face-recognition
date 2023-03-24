import { styles } from '@libs';
import { Navbar } from '@components/organisms';

const MainLayout = ({ children }: any) => {
  return (
    <div className={styles('w-full h-full min-h-[100vh]', 'flex flex-col')}>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
