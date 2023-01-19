import { useState, useEffect, useRef } from "react";

import { Container, Content } from "./Layout.styled";
import HeaderNav from "../Header/HeaderNav";
import Menu from "../Header/Menu/Menu";
import Seo from "../SEO/SEO";
import Search from "../../elements/Search/Search";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchRef = useRef(null)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShowSearch(false);
        searchRef.current.blur()
      } else {
        setShowSearch(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (document) {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"
        setShowSearch(false);
      } else {
        document.body.style.overflow = "unset"
      }
    }
  }, [isMenuOpen]);

  return (
    <Container>
      <Seo />
      <HeaderNav setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
      <div className={`searchMobile ${showSearch ? 'show' : "hidden"}`}>
        <Search searchRef={searchRef} showSearch={showSearch} />
      </div>
      {isMenuOpen ? <Menu /> : null}
      <Content>{children}</Content>
      <div className="footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Layout;
