interface IText {
  className?: string;
  type?: 'h1' | 'h2' | 'p';
  title?: string;
  [key: string]: any;
}

const Text = ({ className, type, title }: IText) => {
  switch (type) {
    case 'h1':
      return <h1 className={className}>{title}</h1>;
    case 'h2':
      return <h2 className={className}>{title}</h2>;
    default:
      return <p className={className}>{title}</p>;
  }
};

export { Text };
