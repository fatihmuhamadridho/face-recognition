import { Image } from '@components/atoms/image';
import { Text } from '@components/atoms/text';
import { CSSProperties } from 'react';

interface ILogo {
  onClick?: (event: any) => void;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  }
};

const Logo = ({ onClick }: ILogo) => {
  return (
    <div onClick={onClick} style={styles.root}>
      <Image height={36} src={__dirname + 'favicon.ico'} width={33} />
      <Text color="white" fw={600} size={24} title="Balitbang" />
    </div>
  );
};

export { Logo };
