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
import VerticalOffer from "../components/OfferCards/VerticalOffer";
import HorizontalOffer from "../components/OfferCards/HorizontalOffer";

// import Seo from "../components/SEO/SEO";

export default function Home(props) {
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
              <h3>Last added</h3>
              <div className="offerWrapper">
                {props.products.last.map((product, index) => {
                  return <VerticalOffer key={product.id} product={product} />;
                })}
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
      type: {
        populate: "*"
      },
      character: {
        populate: "*",
      }
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
