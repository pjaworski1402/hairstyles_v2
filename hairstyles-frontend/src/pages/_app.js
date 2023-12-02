import { createContext, useEffect, useState } from "react";
import App from "next/app";
import { Provider } from "react-redux";

import { fetchAPI } from "../lib/api";
// import { getStrapiMedia } from "../lib/media";
import GlobalStyle from "../styles/GlobalStyle";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import store from "../redux/store";

export const GlobalContext = createContext({});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, num }) {

  const [websiteInfo, setWebsiteInfo] = useState();
  const [menu, setMenu] = useState();
  const [categories, setCategories] = useState();
  const [desktopMenu, setDesktopMenu] = useState();
  const [genders, setGenders] = useState();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      const response = await fetchAPI("/website-setting", {
        populate: {
          logo: "*",
          defaultSeo: {
            populate: "*",
          },
        },
      }, {}, true);
      setWebsiteInfo(response?.data);
    };

    const fetchMenu = async () => {
      const response = await fetchAPI("/burger", {
        populate: {
          menuItems: {
            populate: "*",
          },
        },
      }, {}, true);
      setMenu(response.data);
    };

    const fetchCategories = async () => {
      const response = await fetchAPI("/categories", {
        populate: {
          icon: "*",
          types: {
            populate: "*",
            sort: "name:asc",
          },
        },
        sort: "name:asc",
      }, {}, true);
      setCategories(response.data);
    };

    const fetchDesktopMenu = async () => {
      const response = await fetchAPI("/desktop-menu", {
        populate: {
          item: {
            populate: "*",
          },
        },
      }, {}, true);
      setDesktopMenu(response.data);
    };

    const fetchGenders = async () => {
      const response = await fetchAPI("/genders", {
        populate: {
          populate: "*",
        },
      }, {}, true);
      setGenders(response.data);
    };
    fetchWebsiteInfo();
    fetchMenu();
    fetchCategories();
    fetchDesktopMenu();
    fetchGenders();
  }, []);
  useEffect(() => {
    if (menu && websiteInfo && categories && desktopMenu && genders) {
      setLoaded(true)
    }
  }, [menu, websiteInfo, categories, desktopMenu, genders])
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalContext.Provider
        value={{ ...pageProps, menu, global: websiteInfo, categories, desktopMenu, genders }}
      >
        {loaded ? (<Component {...pageProps} />) : <div></div>}
      </GlobalContext.Provider>
    </Provider>
  );
}

export default MyApp;
