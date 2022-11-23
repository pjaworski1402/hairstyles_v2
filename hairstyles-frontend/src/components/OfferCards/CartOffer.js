import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import { Container } from "./CartOffer.styled"
import trash from "../../static/icons/trash.svg"

const CartOffer = ({ offer, removeProduct }) => {
    const image = getStrapiMedia(offer.gallery);
    const imageData = offer.gallery.data[0].attributes;
    return (<Container>
        <div className="thumbnail">
            <Image
                src={image[0]}
                loader={() => image[0]}
                width={imageData.width}
                height={imageData.height}
                unoptimized
            />
        </div>
        <div className="info">
            <div className="title">
                {offer.title}
            </div>
            <div className="tags">
                {offer.tags.data.map((tag, index) => {
                    return index < offer.tags.data.length - 1
                        ? `${tag.attributes.name} |`
                        : tag.attributes.name;
                })}
            </div>
            <div className="price">
                ${offer.price}
            </div>
        </div>
        <div className="endWrapper">
            <div className="priceDesktop">
                ${offer.price}
            </div>
            <button onClick={() => removeProduct(offer)}>
                <Image src={trash} width={24} height={24} />
            </button>
            <div className="quantity">x1</div>
        </div>
    </Container>);
}

export default CartOffer;