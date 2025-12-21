import React, { useContext } from "react";
import "./productDisplay.css";
import star_icon from "../assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContest";
const BASE_URL = "http://localhost:9000/";

const ProductDisplay = (props) => {
  const { addToCart, getTotalCartItems } = useContext(ShopContext);

  const { product } = props;

  return (
    <div className="product-display">
      <div className="product-display-left ">
        <div className="product-display-img-list">
          {product?.related_image && (
            <img src={BASE_URL + product?.related_images} alt="" />
          )}
        </div>
        <div className="product-display-img">
          <img
            className="product-display-main-img"
            src={BASE_URL + product?.thumbnail}
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product?.name}</h1>
        <div className="product-display-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
        </div>
        <div className="product-display-right-prices">
          <div className="product-display-right-old-prices">
            ${"Old Price: " + product?.old_price}
          </div>
          <div className="product-display-right-new-prices">
            ${"New Price:" + product?.new_price}
          </div>
        </div>
        <div className="product-display-right-description">
          <p>{product?.description}</p>
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

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product.id);
          }}
          disabled={parseInt(product?.quantity) === getTotalCartItems()}
        >
          ADD TO CART
        </button>
        <div className="product-display-right-category-items">
          <p className="product-category-right-category">
            <span> Tategory:</span> Women, T-shirt, Crop Top
          </p>
          <p className="product-category-right-category">
            <span> Tags:</span> Mordern, Latest
          </p>
          <p className="product-category-right-category">
            <span>{"Quantity: " + product?.quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
