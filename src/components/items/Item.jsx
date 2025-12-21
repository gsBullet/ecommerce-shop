import React from "react";
import "./item.css";
import { Link } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BACKEND_IMG_URL;
const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          src={BASE_URL + props.image}
          alt=""
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
        <div className="item-quantity">{"Quantity: " + props.quantity}</div>
      </div>
    </div>
  );
};

export default Item;
