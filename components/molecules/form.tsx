import { Button, Input } from '@components/atoms';
import { styles } from '@libs';

interface IForm {
  className?: string[] | string;
  initialValues?: { [key: string]: any };
  handleChange?: (event: any) => void;
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
      className={styles('flex flex-col', 'space-y-4', className)}
      onSubmit={handleSubmit}>
      {!hideDefaultInput &&
        Object.keys(initialValues).map((item: any, index: any) => (
          <Input key={index} name={item} onChange={handleChange} />
        ))}
      {children}
      {!hideDefaultButton && <Button type="submit" title="Submit" />}
    </form>
  );
};

export { Form };
