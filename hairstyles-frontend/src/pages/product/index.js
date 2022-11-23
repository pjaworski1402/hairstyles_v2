import { useRouter } from "next/router";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Product = ({ product, categories }) => {
  const router = useRouter();
  const { pid } = router.query;

  return <>produkty</>;
};

export default Product;
