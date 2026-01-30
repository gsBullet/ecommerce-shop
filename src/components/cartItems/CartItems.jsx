import React, { useContext } from "react";
import "./cartItems.css";
import { ShopContext } from "../../context/ShopContest";
import remove_icon from "../../components/assets/Frontend_Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:9000/";

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    products: all_product,
    getTotalAmount,
    addToCart,
    clearCart,
    getTotalItems,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  // console.log(cartItems);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {Object.entries(cartItems).map(([cartKey, item]) => {
        const product = all_product.find((p) => p.id === item.productId);

        if (!product) return null;

        return (
          <div key={cartKey}>
            <div className="cartitems-format cartitems-format-main">
              <img
                src={BASE_URL + product.thumbnail}
                alt={product.name}
                className="carticon-product-icon"
              />

              <p>{product.name}</p>

              {/* ✅ SIZE */}
              <p>{item.size}</p>

              <p>${product.new_price}</p>

              {/* ✅ QUANTITY */}
              <button
                onClick={() => addToCart(item.productId, item.size)}
                className="cartItems-quantity"
              >
                {item.quantity}
              </button>

              {/* ✅ SUBTOTAL */}
              <p>${product.new_price * item.quantity}</p>

              {/* ✅ REMOVE */}
              <img
                src={remove_icon}
                alt=""
                className="cartitems-remove-item"
                onClick={() => removeFromCart(product.id)}
              />
            </div>
            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalAmount()}</h3>
            </div>
          </div>
          <button
            disabled={getTotalItems() === 0}
            className="cartitems-checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>Have a promocode? Enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Apply</button>
          </div>
          <div className="cartitems-clearcartbox">
            <button onClick={clearCart} className="">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
