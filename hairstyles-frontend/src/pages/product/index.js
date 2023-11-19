import { useRouter } from "next/router";
import { useEffect } from "react";

const Product = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/results")
  }, [router])
  return <>loading</>;
};

export default Product;
