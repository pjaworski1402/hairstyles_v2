import Layout from "../components/Layout/Layout";
import Slider from "../components/Slick/Slider";
import { fetchAPI } from "../lib/api";
import {
  Container,
  DesktopSlider,
  MobileSlider,
  Categories,
  Wrapper,
  Offers,
} from "../styles/pages/Home.styled";
import CategoryCircle from "../components/CategoryCircle/CategoryCircle";
import Link from "next/link";
import Image from "next/image";
import arrowRightIco from "../static/icons/arrowRight.svg"
import OfferCard from "../components/OfferCards/OfferCard";

// import Seo from "../components/SEO/SEO";

export default function Home(props) {
  console.log(props)
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
        <Wrapper>
          <div className="container">
            <Categories>
              <h3>Categories</h3>
              <div className="categoryWrapper">
                {props.categoryCircles.attributes.category.map(
                  (category, index) => {
                    return <CategoryCircle key={index} category={category} />;
                  }
                )}
              </div>
            </Categories>
          </div>
        </Wrapper>
        <Wrapper>
          <div className="container">
            <Offers>
              <h3>Last added
                <Link href={`/results`}>
                  <a className="showMoreTop">
                    Show more
                  </a>
                </Link>
              </h3>
              <div className="offerWrapper">
                {props.products.last.map((product, index) => {
                  return <OfferCard key={`last_${product.id}`} product={product} />;
                })}
                <Link href={`/results`}>
                  <a className="showMoreBottom">
                    <Image src={arrowRightIco} alt="arrowRight" width={16} height={16} />
                    Show more offers
                  </a>
                </Link>
              </div>
              <h3>Clothes
                <Link href={`/results?type=["top","dress","bottom","hat","shoes","accessories"]&price=[1,200]`}>
                  <a className="showMoreTop">
                    Show more
                  </a>
                </Link>
              </h3>
              <div className="offerWrapper">
                {props.products.clothes.map((product, index) => {
                  return <OfferCard key={`clothes_${product.id}`} product={product} />;
                })}
                <Link href={`/results?type=["top","dress","bottom","hat","shoes","accessories"]&price=[1,200]`}>
                  <a className="showMoreBottom">
                    <Image src={arrowRightIco} alt="arrowRight" width={16} height={16} />
                    Show more offers
                  </a>
                </Link>
              </div>
              <h3>Hairstyles
                <Link href={`/results?type=["long","medium","short"]&price=[1,200]`}>
                  <a className="showMoreTop">
                    Show more
                  </a>
                </Link>
              </h3>
              <div className="offerWrapper">
                {props.products.hairstyles.map((product, index) => {
                  return <OfferCard key={`hairstyles_${product.id}`} product={product} />;
                })}
                <Link href={`/results?type=["long","medium","short"]&price=[1,200]`}>
                  <a className="showMoreBottom">
                    <Image src={arrowRightIco} alt="arrowRight" width={16} height={16} />
                    Show more offers
                  </a>
                </Link>
              </div>
              <h3>Peds
                <Link href={`/results?type=["ped","baby","child1","child2","teen","adult","other"]&price=[1,200]`}>
                  <a className="showMoreTop">
                    Show more
                  </a>
                </Link>
              </h3>
              <div className="offerWrapper">
                {props.products.peds.map((product, index) => {
                  return <OfferCard key={`peds_${product.id}`} product={product} />;
                })}
                <Link href={`/results?type=["ped","baby","child1","child2","teen","adult","other"]&price=[1,200]`}>
                  <a className="showMoreBottom">
                    <Image src={arrowRightIco} alt="arrowRight" width={16} height={16} />
                    Show more offers
                  </a>
                </Link>
              </div>
            </Offers>
          </div>
        </Wrapper>
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
      gender: {
        populate: "*"
      },
      type: {
        populate: "*"
      },
      character: {
        populate: "*",
      }
    },
    pagination: {
      start: 0,
      limit: 4
    }
  });
  const productClothes = await fetchAPI("/products", {
    populate: {
      gallery: {
        populate: "*",
      },
      tags: {
        populate: "*",
      },
      gender: {
        populate: "*"
      },
      type: {
        populate: "*"
      },
      character: {
        populate: "*",
      }
    },
    filters: {
      type: {
        category: {
          name: { $in: ['clothes'] }
        }
      },
    },
    pagination: {
      start: 0,
      limit: 4
    }
  });
  const productHairstyles = await fetchAPI("/products", {
    populate: {
      gallery: {
        populate: "*",
      },
      tags: {
        populate: "*",
      },
      gender: {
        populate: "*"
      },
      type: {
        populate: "*"
      },
      character: {
        populate: "*",
      }
    },
    filters: {
      type: {
        category: {
          name: { $in: ['hairstyles'] }
        }
      },
    },
    pagination: {
      start: 0,
      limit: 4
    }
  });
  const productPeds = await fetchAPI("/products", {
    populate: {
      gallery: {
        populate: "*",
      },
      tags: {
        populate: "*",
      },
      gender: {
        populate: "*"
      },
      type: {
        populate: "*"
      },
      character: {
        populate: "*",
      }
    },
    filters: {
      type: {
        category: {
          name: { $in: ['peds'] }
        }
      },
    },
    pagination: {
      start: 0,
      limit: 4
    }
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
        clothes: productClothes.data,
        hairstyles: productHairstyles.data,
        peds: productPeds.data
      },
    },
  };
}
