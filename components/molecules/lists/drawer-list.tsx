import { styles } from '@libs';
import { useRouter } from 'next/navigation';
import { Divider } from '@components/atoms';

interface IDrawerList {
  data?: IData[];
  [key: string]: any;
}

interface IData {
  title: string;
  path: string;
  isLine?: boolean;
}

const DrawerList = ({ data }: IDrawerList) => {
  const router = useRouter();
  return (
    <ul className={styles('space-y-3')}>
      {data?.map((item: IData, index: any) => (
        <div className={styles('space-y-3')} key={index}>
          <li
            className={styles('capitalize cursor-pointer')}
            onClick={() => router.push(item.path)}>
            {item.title}
          </li>
          {item?.isLine && <Divider />}
        </div>
      ))}
    </ul>
  );
};

export { DrawerList };
