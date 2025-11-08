import React, { useContext } from "react";
import "./productDisplay.css";
import star_icon from "../assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContest";

const ProductDisplay = (props) => {
  const { addToCart } = useContext(ShopContext);

  const { product } = props;
  return (
    <div className="product-display">
      <div className="product-display-left ">
        <div className="product-display-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
          <img
            className="product-display-main-img"
            src={product.image}
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="product-display-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
        </div>
        <div className="product-display-right-prices">
          <div className="product-display-right-old-prices">
            ${product.old_price}
          </div>
          <div className="product-display-right-new-prices">
            ${product.new_price}
          </div>
        </div>
        <div className="product-display-right-description">
          <p>{product.description}</p>
        </div>
        <div className="product-display-right-size">
          <h1>select size</h1>
          <div className="product-display-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>Xl</div>
            <div>xxl</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>add to cart</button>
        <div className="product-display-right-category-items">
          <p className="product-category-right-category">
            <span> Tategory:</span> Women, T-shirt, Crop Top
          </p>
          <p className="product-category-right-category">
            <span> Tags:</span> Mordern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
