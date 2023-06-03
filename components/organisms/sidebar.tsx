import { Image } from '@components/atoms/image';
import { Text } from '@components/atoms/text';
import { Logo } from '@components/molecules/logo';
import { CSSProperties } from 'react';

interface ISidebar {
  topRoutes?: any;
  bottomRoutes?: any;
  activePath?: any;
  [key: string]: any;
}

interface ISidebarItem {
  icon?: any;
  title?: string;
  color?: string;
  onClick?: (event: any) => void;
  style?: CSSProperties;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    padding: '35px 40px',
    width: '100%',
    maxWidth: '280px',
    height: '100vh',
    backgroundColor: '#434076',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px'
  },
  routes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  item: {
    backgroundColor: '#4E498D',
    padding: '8px',
    width: '100%',
    maxWidth: '200px',
    display: 'flex',
    gap: '8px',
    cursor: 'pointer',
    borderRadius: '8px'
  }
};

const SidebarItem = ({ icon, title, color, onClick, style }: ISidebarItem) => {
  return (
    <div onClick={onClick} style={{ ...styles.item, ...style }}>
      {typeof icon !== 'string' ? icon : <Image src={icon} />}
      <Text color={color} title={title} />
    </div>
  );
};

const Sidebar = ({ onClickLogo, topRoutes, bottomRoutes, activePath }: ISidebar) => {
  return (
    <div style={styles.root}>
      <div style={styles.top}>
        <Logo onClick={onClickLogo} />
        <div style={styles.routes}>
          {topRoutes?.map((item: any, index: any) => (
            <SidebarItem
              color="white"
              icon={item?.icon}
              key={index}
              onClick={item?.onClick}
              style={item.path !== activePath ? { background: 'none' } : {}}
              title={item?.title}
            />
          ))}
        </div>
      </div>
      <div style={styles.routes}>
        {bottomRoutes?.map((item: any, index: any) => (
          <SidebarItem
            color="white"
            icon={item?.icon}
            key={index}
            onClick={item?.onClick}
            style={{ background: 'none' }}
            title={item?.title}
          />
        ))}
      </div>
    </div>
  );
};

export { Sidebar };
