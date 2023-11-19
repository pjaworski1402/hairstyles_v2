import { useState, useEffect, useRef } from "react";

import { Container, Content } from "./Layout.styled";
import HeaderNav from "../Header/HeaderNav";
import Menu from "../Header/Menu/Menu";
import Seo from "../SEO/SEO";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";
import SearchMobile from "./SearchMobile/SearchMobile";

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
      <Seo />
      {isFiltersOpen && <Filters setIsFiltersOpen={setIsFiltersOpen} />}
      <HeaderNav setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
      <SearchMobile setIsFiltersOpen={setIsFiltersOpen} isMenuOpen={isMenuOpen} />
      {isMenuOpen ? <Menu setMenuOpenProps={setMenuOpen} /> : null}
      <Content>{children}</Content>
      <div className="footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Layout;
