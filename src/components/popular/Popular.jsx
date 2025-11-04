import React from "react";
import "./popular.css";
import data_products from "../assets/Frontend_Assets/data";
import Item from "../items/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>popular in women</h1>
      <hr />
      <div className="popular-items">
        {data_products.map((item) => (
          <Item
            key={item.id}
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

export default Popular;
