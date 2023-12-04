import qs from "qs";

export function getStrapiURL(path = "", isNotLocal = false) {
  if (isNotLocal) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://cms.hairstyles-gta5.com"
      }${path}`;
  } else {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1338"
      }${path}`;
  }
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}, isNotLocal = false) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: false });
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`, isNotLocal
  )}`;
  const response = await fetch(requestUrl, mergedOptions).then((res) => {
    if (!res.ok) {
      console.error(res.statusText);
      throw new Error(`An error occured please try again`);
    }
    return res.json();
  }).catch(err => console.log(err));
  return response;
}