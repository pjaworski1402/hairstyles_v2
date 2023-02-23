import { Container } from "./ContentOffer.styled"
import addToCartIco from "../../../static/icons/add-to-cart.svg"
import Image from "next/image";
import OfferAttributes from "../../OfferAttributes/OfferAttributes";
import { addToCart, removeFromCart } from "../../../redux/cart.slice";
import { useDispatch } from "react-redux";

export const tabs = {
    description: "DESCRIPTION",
    review: "REVIEW",
    similar: "SIMILAR",
}

const MobileContentOffer = ({ product, setCurrentTab, currentTab, isInCart }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product))
    }
    return (
        <Container className="container">
            <div className="productHeader">
                <div className="topHeader">
                    <div className="title">{product.title}</div>
                </div>
                <div className="bottomHeader">
                    <div className="priceWrapper">
                        <div className="price">{product.price}$</div>
                        {product.old_price > product.price && (
                            <div className="oldPrice">{product.old_price}$</div>
                        )}
                    </div>
                    <div className="tags">
                        {product.tags.data.map((tag) => (
                            <div key={tag.id} className="tag">
                                #{tag.attributes.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <nav className="tabs">
                <button className={`tab${currentTab === tabs.description ? " active" : ""}`} onClick={() => setCurrentTab(tabs.description)}>Description</button>
                <button className={`tab${currentTab === tabs.review ? " active" : ""}`} onClick={() => setCurrentTab(tabs.review)}>Review</button>
                <button className={`tab${currentTab === tabs.similar ? " active" : ""}`} onClick={() => setCurrentTab(tabs.similar)}>Similar products</button>
            </nav>
            <main className="content">
                {tabs.description === currentTab &&
                    <>
                        <div className="description">
                            {product.description}
                        </div>
                        <OfferAttributes product={product} />
                    </>
                }
                {tabs.review === currentTab &&
                    <div className="review">
                        Coming soon...
                    </div>
                }
            </main>
            <div className="bottomWrapper">
                {isInCart ? (
                    <button className="bottomWrapper" onClick={handleRemoveFromCart}>
                        <div className="removeFromCartButton">
                            Remove from Cart
                        </div>
                    </button>
                ) : (
                    <button className="addToCartButton" onClick={handleAddToCart}>
                        <Image src={addToCartIco} width={20} height={20} />
                        Add to Cart {`($${product.price})`}
                    </button>
                )}
            </div>
        </Container>
    );
}

export default MobileContentOffer;