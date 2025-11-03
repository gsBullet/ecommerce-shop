import React, { useContext } from "react";
import "./cartItems.css";
import { ShopContext } from "../../context/ShopContest";
import remove_icon from "../../components/assets/Frontend_Assets/cart_cross_icon.png";

const CartItems = () => {
  const { cartItems, removeFromCart, all_product, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map(
        (product) =>
          cartItems[product.id] > 0 && (
            <div>
              <div
                key={product.id}
                className="cartitems-format cartitems-format-main "
              >
                <img
                  src={product.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <button className="cartItems-quantity">
                  {cartItems[product.id]}
                </button>
                <p>${product.new_price * cartItems[product.id]}</p>
                <img
                  src={remove_icon}
                  alt=""
                  className="cartitems-remove-item"
                  onClick={() => removeFromCart(product.id)}
                />
              </div>
              <hr />
            </div>
          )
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>sub total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>{" "}
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>${0}</p>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>Have a promocode? Enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
