/* eslint-disable @next/next/no-img-element */

interface IImage {
  alt?: string;
  src?: any;
  width?: number;
  height?: number;
  [key: string]: any;
}

const Image = ({ alt, src, width, height }: IImage) => {
  return <img alt={alt} height={height} src={src} width={width} />;
};

export { Image };
