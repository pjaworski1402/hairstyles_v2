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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import Seo from "../components/SEO/SEO";

function getMinMax(arr) {
    let min = Infinity;
    let max = -Infinity;
    arr.forEach(val => {
        const [start, end] = val.split("-").map(Number);
        if (start < min) {
            min = start;
        }
        if (end > max) {
            max = end;
        }
    });
    // if (arr.length === 1) {
    //     max = min
    // }
    return [min, max];
}

export default function Results(props) {
    const [products, setProducts] = useState([])
    const router = useRouter()
    useEffect(() => {
        const { type, gender, texture, price } = router.query;
        const textureValueRange = getMinMax(JSON.parse(texture || "[1-99]"))
        const priceValueRange = JSON.parse(price || "[1,200]")
        fetchAPI("/products", {
            filters: {
                type: {
                    name: { $in: JSON.parse(type || "[]") }
                },
                gender: {
                    name: { $in: JSON.parse(gender || "[]") }
                },
                color_variants: {
                    $gte: textureValueRange[0],
                    $lte: textureValueRange[1]
                },
                price: {
                    $gte: priceValueRange[0],
                    $lte: priceValueRange[1]
                }
            },
            populate: {
                type: {
                    populate: "*"
                },
                gender: {
                    populate: "*"
                },
                gallery: {
                    populate: "*",
                },
                tags: {
                    populate: "*",
                },
            },
        }).then((res) => {
            setProducts(res.data)
        });
    }, [router.query])
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
                <div className="container">
                    <Offers>
                        <h3>Last added</h3>
                        <div className="offerWrapper">
                            {products.map((product, index) => {
                                return <VerticalOffer key={product.id} product={product} />;
                            })}
                        </div>
                    </Offers>
                </div>
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

    return {
        props: {
            slides: {
                mobile: slidesMobile.data,
                desktop: slidesDesktop.data,
            },
            categoryCircles: categoryCircles.data,
        },
    };
}
