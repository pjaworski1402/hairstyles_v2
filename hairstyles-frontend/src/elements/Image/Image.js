import { getStrapiMedia } from "../../lib/media";
import NextImage from "next/image";

const Image = ({ image }) => {
  const { alternativeText, width, height } = image.data.attributes;
  const src = getStrapiMedia(image);
  return (
    <NextImage
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={src}
      alt={alternativeText || ""}
      loader={() => src}
    />
  );
};

export default Image;
