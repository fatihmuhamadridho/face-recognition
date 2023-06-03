import { CSSProperties } from 'react';

interface IButton {
  title?: string;
  className?: string;
  type?: 'button' | 'submit';
  style?: CSSProperties;
  onClick?: (event: any) => void;
  children?: any;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    padding: '7px 0px',
    width: '100%',
    backgroundColor: "#D9D9D9"
  }
};

const Button = ({ title, className, type, style, onClick, children }: IButton) => {
  return (
    <button className={className} onClick={onClick} style={{ ...styles.root, ...style }} type={type}>
      {title || children}
    </button>
  );
};

export { Button };
