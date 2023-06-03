import { Text } from '@components/atoms/text';
import { CSSProperties } from 'react';

interface INavbar {
  title?: string;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    padding: '20px 40px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: "16px"
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#D9D9D9',
    borderRadius: '100%'
  }
};

const Navbar = ({ title }: INavbar) => {
  return (
    <div style={styles.root}>
      <Text fw={500} fz={32} title={title} />
      <div style={styles.avatar}></div>
    </div>
  );
};

export { Navbar };
