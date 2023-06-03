import { CSSProperties } from 'react';

interface IText {
  title?: string;
  fs?: 'italic' | 'normal';
  fz?: number;
  fw?: number;
  ta?: 'start' | 'end' | 'justify' | 'center';
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  children?: any;
  [key: string]: any;
}

const Text = ({
  title,
  fs,
  fz,
  fw,
  ta,
  size,
  color,
  className,
  style,
  children
}: IText) => {
  return (
    <div
      className={className}
      style={{
        ...{
          fontStyle: fs,
          fontSize: `${fz || size}px`,
          fontWeight: fw,
          color: color,
          textAlign: ta
        },
        ...style
      }}>
      {title || children}
    </div>
  );
};

export { Text };
