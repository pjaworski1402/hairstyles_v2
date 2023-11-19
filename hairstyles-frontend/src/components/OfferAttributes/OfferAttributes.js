import Image from "next/image";
import { Container } from "./OfferAttributes.styled";
import typeIco from "../../static/icons/type.svg";
import genderIco from "../../static/icons/gender.svg";
import rainbowIco from "../../static/icons/rainbow.svg";
import userGearIco from "../../static/icons/user-gear.svg";
import { getStrapiMedia } from "../../lib/media";

const OfferAttributes = ({ product }) => {
  // console.log(product.type.data.attributes.category.data.attributes.icon.data.attributes.url);
  const categoryImg = getStrapiMedia(product.type.data.attributes.category.data.attributes.icon);
  return (
    <Container>
      <div className="attribute">
        <div className="attributeTitle">Category</div>
        <div className="attributeWrapper">
          <Image src={categoryImg} width={24} height={24}
            loader={() => categoryImg}
          />
          {product?.type?.data?.attributes?.category?.data?.attributes?.name}
        </div>
      </div>
      <div className="attribute">
        <div className="attributeTitle">Gender</div>
        <div className="attributeWrapper">
          <Image src={genderIco} width={24} height={24} />
          {product.gender.data.attributes.name}
        </div>
      </div>
      <div className="attribute">
        <div className="attributeTitle">Type</div>
        <div className="attributeWrapper">
          <Image src={typeIco} width={24} height={24} />
          {product?.type?.data?.attributes?.name}
        </div>
      </div>
      <div className="attribute">
        <div className="attributeTitle">Color variants</div>
        <div className="attributeWrapper">
          <Image src={rainbowIco} width={24} height={24} />
          {product.color_variants}
        </div>
      </div>
      <div className="attribute">
        <div className="attributeTitle">Character</div>
        <div className="attributeWrapper">
          <Image src={userGearIco} width={24} height={24} />
          {product.character.data.attributes.name}
        </div>
      </div>
    </Container>
  );
};

export default OfferAttributes;
