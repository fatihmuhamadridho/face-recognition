import { Button, Input } from '@components/atoms';
import { styles } from '@libs';

interface IForm {
  className?: string[] | string;
  initialValues?: { [key: string]: any };
  // eslint-disable-next-line no-unused-vars
  handleChange?: (event: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (event: any) => void;
  hideDefaultInput?: boolean;
  hideDefaultButton?: boolean;
  children?: any;
  [key: string]: any;
}

const Form = ({
  className,
  initialValues = {},
  handleChange,
  handleSubmit = (values: any) => console.log(values),
  hideDefaultInput,
  hideDefaultButton,
  children
}: IForm) => {
  return (
    <form
      className={styles('w-full', 'flex flex-col', 'space-y-2', className)}
      onSubmit={handleSubmit}>
      {!hideDefaultInput
        && Object.keys(initialValues).map((item: any, index: any) => (
          <Input key={index} name={item} onChange={handleChange} />
        ))}
      {children}
      {!hideDefaultButton && <Button title="Submit" type="submit" />}
    </form>
  );
};

export { Form };
