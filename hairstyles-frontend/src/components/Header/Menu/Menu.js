import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";
import {
  Container,
  Wrapper,
  Element,
  SubMenu,
  SubElement,
  Icon,
  DropDownIco,
} from "./Menu.styled";
import arrowRight from "../../../static/icons/arrow-right.svg";
import arrowDown from "../../../static/icons/arrow-down.svg";

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const wrapperRef = useRef(null);
  const subMenuRef = useRef(null);
  const { menu, categories } = useContext(GlobalContext);
  const { menuItems } = menu.attributes;
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.fromTo(
      wrapperRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0", opacity: 1 }
    );
  }, []);
  useEffect(() => {
    if (openMenu) {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.fromTo(
        subMenuRef.current,
        { y: "-50%", opacity: 0 },
        { y: "0", opacity: 1 }
      );
    }
  }, [openMenu]);
  return (
    <Container>
      <Wrapper ref={wrapperRef} className="container">
        {menuItems.map((element) => {
          const icon = getStrapiMedia(element.icon);
          const getCategories = element.dropDown?.getCategories || false;
          return (
            <React.Fragment key={`element_${element.id}`}>
              <Element
                onClick={() => setOpenMenu(openMenu ? false : element.id)}
              >
                <Link href={element.path ? element.path : "/"}>
                  <a>
                    <Icon>
                      <Image
                        loader={icon}
                        src={icon}
                        unoptimized
                        width={28}
                        height={28}
                      />
                    </Icon>
                    {element.title}
                    {getCategories ? (
                      <DropDownIco>
                        <Image
                          src={arrowDown}
                          width={16}
                          height={16}
                          className="dropDown"
                        />
                      </DropDownIco>
                    ) : null}
                  </a>
                </Link>
              </Element>
              {getCategories && openMenu === element.id ? (
                <SubMenu ref={subMenuRef}>
                  {categories.map((category) => {
                    return (
                      <SubElement key={`category_${category.id}`}>
                        <Link
                          href={`/${element.title}/${category.attributes.name}`}
                        >
                          <a>
                            <Icon>
                              <Image src={arrowRight} width={16} height={16} />
                            </Icon>
                            {category.attributes.name}
                          </a>
                        </Link>
                      </SubElement>
                    );
                  })}
                </SubMenu>
              ) : null}
            </React.Fragment>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Menu;
