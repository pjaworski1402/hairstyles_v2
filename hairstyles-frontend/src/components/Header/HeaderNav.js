import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../pages/_app";
import {
  Wrapper,
  Logo,
  MenuButton,
  SiteName,
  DesktopNav,
  DesktopRight,
  Container,
  SearchWrapper,
} from "./HeaderNav.styled";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "../../lib/media";
import menuIco from "../../static/icons/menu.svg";
import closeIco from "../../static/icons/close.svg";
import shoppingCart from "../../static/icons/shopping-cart.svg";
import heart from "../../static/icons/heart.svg";
import Search from "../../elements/Search/Search";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const HeaderNav = ({ setMenuOpen, isMenuOpen, pageProps, displayCartMobile }) => {
  const { global, menu, desktopMenu } = useContext(GlobalContext);
  const { logo, siteName } = global.attributes;
  const { menuItems } = menu.attributes;
  const { item } = desktopMenu.attributes;
  const cart = useSelector((state) => state.cart);
  const [lengthCart, setLengthCart] = useState(0);
  const router = useRouter();
  const handleClickMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setLengthCart(cart.length);
  });

  return (
    <Container>
      <Wrapper className="container">
        <Logo>
          <Link href={"/"}>
            <a>
              <Image
                loader={() => getStrapiMedia(logo)}
                src={getStrapiMedia(logo)}
                width={35}
                height={35}
                unoptimized
                alt="hairstyles-gta5"
              />
              <SiteName>{siteName}</SiteName>
            </a>
          </Link>
        </Logo>
        <DesktopNav>
          {item.map((element) => {
            return (
              <li
                key={element.id}
                className={
                  decodeURIComponent(router.asPath) ==
                    decodeURIComponent(element.path)
                    ? "active"
                    : ""
                }
              >
                <Link href={element.path}>{element.title}</Link>
              </li>
            );
          })}
        </DesktopNav>
        {!displayCartMobile && (
          <Link href={`/cart`}>
            <a style={{ marginLeft: "auto", marginRight: "16px" }} className="cartMobile">
              <div className="cartLength">
                <Image alt="cartIco" src={shoppingCart} height={24} width={24} />
              </div>
            </a>
          </Link>
        )}
        <MenuButton onClick={handleClickMenu}>
          <Image alt="menuIco" src={isMenuOpen ? closeIco : menuIco} />
        </MenuButton>
        <DesktopRight>
          <SearchWrapper>
            <Search />
          </SearchWrapper>
          {/* <Link href={`/fav`}>
            <a>
              <Image src={heart} height={24} width={24} />
            </a>
          </Link> */}
          <Link href={`/cart`}>
            <a>
              <div className="cartLength">
                <Image src={shoppingCart} height={24} width={24} alt="cart" />
                {lengthCart ? (
                  <div className="cartLengthValue">{lengthCart}</div>
                ) : null}
              </div>
            </a>
          </Link>
        </DesktopRight>
      </Wrapper>
    </Container>
  );
};

export default HeaderNav;
