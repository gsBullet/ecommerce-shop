import React from "react";
import Popular from "../components/popular/Popular";
import Offers from "../components/offers/Offers";
import NewCollection from "../components/newCollection/NewCollection";
import NewsLetter from "../components/newsLetter/NewsLetter";
import Hero from "../components/hero/Hero";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  );
};

export default Shop;
