import Layout from "../../components/Layout/Layout";
import Slider from "../../components/Slick/Slider";
import { fetchAPI } from "../../lib/api";
import {
    Container,
    DesktopSlider,
    MobileSlider,
    Offers,
} from "../../styles/pages/Results.styled";
import VerticalOffer from "../../components/OfferCards/VerticalOffer";
import HorizontalOffer from "../../components/OfferCards/HorizontalOffer";
import Filters from "../../components/Filters/Filters";

// import Seo from "../components/SEO/SEO";

export default function Results(props) {
    return (
        <Layout>
            <Container>
                <DesktopSlider>
                    <Slider
                        slides={props.slides.desktop.attributes.slider}
                        height={500}
                    />
                </DesktopSlider>
                <MobileSlider>
                    <Slider slides={props.slides.mobile.attributes.slider} height={128} />
                </MobileSlider>
                <Filters />
                {/* <div className="container">
                    <Offers>
                        <h3>Last added</h3>
                        <div className="offerWrapper">
                            {props.products.last.map((product, index) => {
                                return <VerticalOffer key={product.id} product={product} />;
                            })}
                        </div>
                    </Offers>
                </div> */}
            </Container>
        </Layout>
    );
}

export async function getStaticProps() {
    const slidesMobile = await fetchAPI("/slider-mobile", {
        populate: {
            slider: {
                populate: "*",
            },
        },
    });
    const slidesDesktop = await fetchAPI("/slider-desktop", {
        populate: {
            slider: {
                populate: "*",
            },
        },
    });
    const categoryCircles = await fetchAPI("/circles-category-home", {
        populate: {
            category: {
                populate: "*",
            },
        },
    });
    const productLast = await fetchAPI("/products", {
        populate: {
            gallery: {
                populate: "*",
            },
            tags: {
                populate: "*",
            },
        },
    });
    return {
        props: {
            slides: {
                mobile: slidesMobile.data,
                desktop: slidesDesktop.data,
            },
            categoryCircles: categoryCircles.data,
            products: {
                last: productLast.data,
            },
        },
    };
}
