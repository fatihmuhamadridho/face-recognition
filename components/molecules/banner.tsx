import { Text } from '@components/atoms/text';
import { CSSProperties } from 'react';

interface IBanner {
  title?: string;
  subTitle?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    width: '100%',
    padding: '24px 32px',
    backgroundColor: '#434076',
    borderRadius: '16px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px 0x',
  },
};

const Banner = ({ title, subTitle, className, style }: IBanner) => {
  return (
    <div
      className={className}
      style={{
        ...styles.root,
        ...style,
      }}>
      <Text fw={500} size={24} title={title} />
      <Text fw={500} size={14} title={subTitle} />
    </div>
  );
};

export { Banner };
