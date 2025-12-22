import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContest";
import { useParams } from "react-router-dom";
import Breadcum from "../components/breadcums/Breadcum";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";

const Product = () => {
  const { products, fetchProducts } = useContext(ShopContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const { productId } = useParams();
  const product = products?.find(
    (product) => product.id === productId || product.id === Number(productId)
  );

  return (
    <div>
      <Breadcum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts category={product?.category?.name} />
    </div>
  );
};

export default Product;
