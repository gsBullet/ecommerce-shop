import React from "react";
import "./relatedProducts.css";
import data_product from "../assets/Frontend_Assets/data";
import Item from "../items/Item";

const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-items">
        {data_product.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
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
