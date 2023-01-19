import { createContext } from "react";
import App from "next/app";
import { Provider } from 'react-redux';

import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import GlobalStyle from "../styles/GlobalStyle";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import store from "../redux/store";

export const GlobalContext = createContext({});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, num }) {
  const { global, menu } = pageProps;
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalContext.Provider value={pageProps}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </Provider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  const websiteInfo = await fetchAPI("/website-setting", {
    populate: {
      logo: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });

  const menu = await fetchAPI("/burger", {
    populate: {
      menuItems: {
        populate: "*",
      },
    },
  });

  const desktopMenu = await fetchAPI("/desktop-menu", {
    populate: {
      item: {
        populate: "*",
      },
    },
  });

  const categories = await fetchAPI("/categories", {
    populate: {
      icon: "*",
      types: {
        populate: "*",
      },
    },
  });

  const genders = await fetchAPI("/genders", {
    populate: {
      populate: "*"
    },
  });

  return {
    ...appProps,
    pageProps: {
      global: websiteInfo.data,
      menu: menu.data,
      categories: categories.data,
      desktopMenu: desktopMenu.data,
      genders: genders.data
    },
  };
};

export default MyApp;
