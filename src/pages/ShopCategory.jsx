import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContest";
import dropdownIcon from "../components/assets/Frontend_Assets/dropdown_icon.png";
import Item from "../components/items/Item";
import "./css/shopcategory.css";

const ShopCategory = (props) => {
  console.log(props);
  
  
  const { all_product } = useContext(ShopContext);
 
  return (
    <div className="shop-category">
      <img
        className="shopcategory-banner"
        src={props.banner}
        alt={props.category}
      />

      <div className="shopcategory-indexSort">
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdownIcon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product?.map((product) => {
          if (product.category?.name?.toLowerCase() === props.category?.toLowerCase()) {
            return (
              <Item
                key={product.id}
                id={product.id}
                image={product.thumbnail}
                name={product.name}
                new_price={product.new_price}
                old_price={product.old_price}
                quantity={product.quantity}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        <button className="load-more-btn">Explore More</button>
      </div>
    </div>
  );
};

export default ShopCategory;
