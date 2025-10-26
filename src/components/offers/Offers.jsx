import React from 'react'
import exclusiveImage from "../assets/Frontend_Assets/exclusive_image.png";
import "./offers.css";

const Offers = () => {
  return (
    <div>
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offer for you</h1>
                <p>ONLY ON BEST SELL PRODUCTS</p>
                <button>check now</button>
            </div>
            <div className="offers-right">
                <img src={exclusiveImage} alt="offer" />
            </div>
        </div>
    </div>
  )
}

export default Offers