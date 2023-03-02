import Layout from "../../components/Layout/Layout";
import Slider from "../../components/Slick/Slider";
import { fetchAPI } from "../../lib/api";
import {
  Container,
  DesktopSlider,
  MobileSlider,
  Offers,
} from "../../styles/pages/Results.styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Filters from "../../components/Filters/Filters";
import MeiliSearch from "meilisearch";
import Search from "../../elements/Search/Search";
import Link from "next/link";
import paginationIco from "../../static/icons/pagination.svg";
import Image from "next/image";
import OfferCard from "../../components/OfferCards/OfferCard";

const client = new MeiliSearch({
  host: "http://46.205.217.7:7700",
});
// import Seo from "../components/SEO/SEO";

function getMinMax(arr) {
  let min = Infinity;
  let max = -Infinity;
  arr.forEach((val) => {
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
  const itemsPerPage = 10;
  const currentPage = parseInt(router.query.page) || 1;
  const pages = Math.ceil(products?.meta?.pagination?.total / itemsPerPage);
  useEffect(() => {
    const { type, gender, texture, price } = router.query;
    const textureValueRange = texture
      ? getMinMax(JSON.parse(texture))
      : getMinMax(JSON.parse(`["1-99"]`));
    const priceValueRange = price ? JSON.parse(price) : JSON.parse("[1,200]");
    const slugSearch = [];
    const fetchProducts = () => {
      fetchAPI(
        "/products",
        {
          filters: {
            type: {
              name: { $in: JSON.parse(type || "[]") },
            },
            gender: {
              name: { $in: JSON.parse(gender || "[]") },
            },
            color_variants: {
              $gte: textureValueRange[0],
              $lte: textureValueRange[1],
            },
            price: {
              $gte: priceValueRange[0],
              $lte: priceValueRange[1],
            },
            slug: {
              $in: slugSearch,
            },
          },
          populate: {
            type: {
              populate: "*",
            },
            gender: {
              populate: "*",
            },
            gallery: {
              populate: "*",
            },
            tags: {
              populate: "*",
            },
            character: {
              populate: "*",
            },
          },
          pagination: {
            start: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage,
          },
        },
        {},
        true
      ).then((res) => {
        setProducts(res);
      });
    };
    if (router.query.search) {
      client
        .index("product")
        .search(router.query.search)
        .then((results) => {
          const { hits } = results;
          hits.forEach((hit) => slugSearch.push(hit.slug));
          fetchProducts();
        });
    } else {
      fetchProducts();
    }
  }, [router.query]);
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
        <div className="main container">
          <div className="filtersContainer">
            <Filters />
          </div>
          <div className="offersWrapper">
            {products.data ? (
              <Offers className="container">
                <div className="searchContainer">
                  <Search />
                </div>
                <div className="resultsInfo">
                  <div className="resultsCounter">
                    {products.meta.pagination.total} results
                  </div>
                </div>
                <div className="offerWrapper">
                  {products.data.map((product, index) => {
                    return (
                      <OfferCard
                        key={product.id}
                        product={product}
                        display="horizontal"
                      />
                    );
                  })}
                </div>
                <div className="pagination">
                  {currentPage > 1 && (
                    <Link
                      href={{
                        pathname: router.pathname,
                        query: { ...router.query, page: currentPage - 1 },
                      }}
                    >
                      <a>
                        <Image
                          src={paginationIco}
                          alt=""
                          width={16}
                          height={16}
                        />
                      </a>
                    </Link>
                  )}
                  {pages > 4 && currentPage + 2 > pages && (
                    <>
                      <div className={`pageWrapper`}>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: { ...router.query, page: 1 },
                          }}
                        >
                          <a>1</a>
                        </Link>
                      </div>
                      <div className={`pageWrapper`}>...</div>
                    </>
                  )}
                  {[...Array(pages).keys()]
                    .slice(
                      currentPage > 3 ? currentPage - 3 : 0,
                      currentPage + 3
                    )
                    .map((num) => (
                      <div
                        className={`pageWrapper${
                          currentPage == num + 1 ? " current" : ""
                        }`}
                        key={`page_${num}`}
                      >
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: { ...router.query, page: num + 1 },
                          }}
                        >
                          <a>{num + 1}</a>
                        </Link>
                      </div>
                    ))}
                  {currentPage + 3 < pages && (
                    <>
                      <div className={`pageWrapper`}>...</div>
                      <div className={`pageWrapper`}>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: { ...router.query, page: pages },
                          }}
                        >
                          <a>{pages}</a>
                        </Link>
                      </div>
                    </>
                  )}
                  {currentPage < pages && (
                    <Link
                      href={{
                        pathname: router.pathname,
                        query: { ...router.query, page: currentPage + 1 },
                      }}
                    >
                      <a>
                        <Image
                          src={paginationIco}
                          alt=""
                          width={16}
                          height={16}
                          style={{ transform: "rotate(180deg)" }}
                        />
                      </a>
                    </Link>
                  )}
                </div>
              </Offers>
            ) : (
              "Loading"
            )}
          </div>
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
