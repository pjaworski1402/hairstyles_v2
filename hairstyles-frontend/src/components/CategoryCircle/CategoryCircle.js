import { Container } from "./CategoryCircle.styled";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";

const CategoryCircle = ({ category }) => {
  const src = getStrapiMedia(category.image);
  const imageData = category.image.data.attributes;
  return (
    <Container>
      <Link href={category.url}>
        <a>
          <div className="imageWrapper">
            <Image
              src={src}
              loader={() => src}
              width={imageData.width}
              height={imageData.height}
            />
          </div>
          <div className="title">{category.title}</div>
        </a>
      </Link>
    </Container>
  );
};

export default CategoryCircle;
