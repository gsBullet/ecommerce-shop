import React, { useContext } from "react";
import "./relatedProducts.css";
import Item from "../items/Item";
import { ShopContext } from "../../context/ShopContest";

const RelatedProducts = (props) => {
  const { all_product } = useContext(ShopContext);

  const related_product = all_product?.filter(
    (product) =>
      product.category?.name?.toLowerCase() === props.category?.toLowerCase()
  );
  return (
    <div className="relatedproducts container m-auto">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-items">
        {related_product?.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.thumbnail}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
