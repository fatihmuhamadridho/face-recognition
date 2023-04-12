import { Button as ButtonCore } from '@mantine/core';

interface IButton {
  type?: 'submit' | 'button';
  variant?: 'default';
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: any) => void;
  children?: any;
  title?: string;
  [key: string]: any;
}

const Button = ({
  type = 'button',
  variant = 'default',
  onClick,
  title,
  children
}: IButton) => {
  return (
    <ButtonCore type={type} variant={variant} onClick={onClick || undefined}>
      {children || title}
    </ButtonCore>
  );
};

export { Button };
