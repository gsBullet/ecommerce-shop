import React from "react";
import "./breadcum.css";
import arrow_icon from "../assets/Frontend_Assets/breadcrum_arrow.png";

const Breadcum = (props) => {
  const { product } = props;
  console.log(product);
  

  return (
    <div className="breadcum">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />{" "}
      {product?.category?.name} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcum;
