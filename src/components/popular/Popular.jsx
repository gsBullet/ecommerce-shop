import React, { useContext } from "react";
import "./popular.css";
import Item from "../items/Item";
import { ShopContext } from "../../context/ShopContest";

const Popular = () => {
  const { products:all_product } = useContext(ShopContext);

  const womenProduct =
    all_product?.filter(
      (product) => product.category?.name?.toLowerCase() === "women" // ✅ SAFE & FIXED
    ) || [];

  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />
      <div className="popular-items">
        {womenProduct.map((item) => (
          <Item
            key={item._id} // ✅ FIXED KEY
            id={item.id}
            image={item.thumbnail}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
