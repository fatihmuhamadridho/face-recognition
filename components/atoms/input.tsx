import { Input as InputCore } from '@mantine/core';

interface IInput {
  label?: string;
  type?: 'text' | 'number';
  name?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: any) => void;
  value?: any;
  hideLabel?: boolean;
  [key: string]: any;
}

const Input = ({ label, type, name, onChange, value, hideLabel }: IInput) => {
  return (
    <InputCore.Wrapper
      label={!hideLabel ? label || name?.toLocaleUpperCase() : undefined}>
      <InputCore name={name} onChange={onChange} type={type} value={value} />
    </InputCore.Wrapper>
  );
};

export { Input };
