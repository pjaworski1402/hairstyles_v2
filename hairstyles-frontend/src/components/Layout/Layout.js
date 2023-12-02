import { useState, useEffect } from "react";

import { Container, Content, CartButton } from "./Layout.styled";
import HeaderNav from "../Header/HeaderNav";
import Menu from "../Header/Menu/Menu";
// import Seo from "../SEO/SEO";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";
import SearchMobile from "./SearchMobile/SearchMobile";
import cartIco from "../../static/icons/shopping-cart-black.svg"
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Layout = ({ children, displayCartMobile }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [lengthCart, setLengthCart] = useState(0);
  useEffect(() => {
    setLengthCart(cart.length);
  }, [cart.length]);
  useEffect(() => {
    if (document) {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }
    }
  }, [isMenuOpen]);

  return (
    <Container>
      {/* <Seo /> */}
      {isFiltersOpen && <Filters setIsFiltersOpen={setIsFiltersOpen} />}
      <HeaderNav displayCartMobile={displayCartMobile} setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
      <SearchMobile setIsFiltersOpen={setIsFiltersOpen} isMenuOpen={isMenuOpen} />
      {isMenuOpen ? <Menu setMenuOpenProps={setMenuOpen} /> : null}
      {displayCartMobile && (
        <CartButton>
          <Link href={"/cart"}>
            <div className="cartWrapper">
              <Image src={cartIco} alt="cartIco" width={32} height={32} />
              {lengthCart > 0 && <div className="lengthCart">{lengthCart}</div>}
            </div>
          </Link>
        </CartButton>
      )}
      <Content>{children}</Content>
      <div className="footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Layout;
