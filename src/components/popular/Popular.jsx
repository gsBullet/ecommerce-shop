import React, { useContext } from "react";
import "./popular.css";
import data_products from "../assets/Frontend_Assets/data";
import Item from "../items/Item";
import { ShopContext } from "../../context/ShopContest";

const Popular = () => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="popular">
      <h1>popular in women</h1>
      <hr />
      <div className="popular-items">
        {all_product?.map((item) => (
          <Item
            key={item.id}
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

export default Popular;
