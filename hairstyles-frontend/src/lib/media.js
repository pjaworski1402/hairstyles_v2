import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  let url;
  let imageUrl;
  if (Array.isArray(media?.data)) {
    imageUrl = [];
    media?.data.forEach((element) => {
      url = element.attributes.url;
      imageUrl.push(url?.startsWith("/uploads") ? getStrapiURL(url, true) : url);
    });
    return imageUrl;
  } else {
    url = media?.data.attributes.url;
    imageUrl = url?.startsWith("/uploads") ? getStrapiURL(url, true) : url;
    if (imageUrl) {
      return imageUrl;
    } else {
      console.error(`Media in /lib is ${imageUrl}`);
      return "";
    }
  }
}
