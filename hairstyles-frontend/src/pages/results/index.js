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
import MeiliSearch from 'meilisearch';

const client = new MeiliSearch({
    host: "http://46.205.217.176:7700",
});
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
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const { type, gender, texture, price } = router.query;
        const textureValueRange = texture ? getMinMax(JSON.parse(texture)) : getMinMax(JSON.parse(`["1-99"]`))
        const priceValueRange = price ? JSON.parse(price) : JSON.parse("[1,200]")
        const slugSearch = []
        const fetchProducts = () => {
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
                    },
                    slug: {
                        $in: slugSearch
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
                    character: {
                        populate: "*",
                    }
                },
            }, {}, true).then((res) => {
                setProducts(res)
            });
        }
        if (router.query.search) {
            client
                .index("product")
                .search(router.query.search)
                .then((results) => {
                    const { hits } = results;
                    hits.forEach(hit => slugSearch.push(hit.slug))
                    fetchProducts()
                });
        } else {
            fetchProducts()
        }
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
                    {products.data ? (
                        <Offers>
                            <h3>{products.meta.pagination.total} results</h3>
                            <div className="offerWrapper">
                                {products.data.map((product, index) => {
                                    return <VerticalOffer key={product.id} product={product} />;
                                })}
                            </div>
                        </Offers>
                    ) : "Loading"}
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
