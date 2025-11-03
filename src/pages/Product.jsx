import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContest";
import { useParams } from "react-router-dom";
import Breadcum from "../components/breadcums/Breadcum";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);

  const { productId } = useParams();
  const product = all_product.find(
    (product) => product.id === Number(productId)
  );

  return (
    <div>
      <Breadcum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
