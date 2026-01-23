import React, { useContext } from "react";
import "./relatedProducts.css";
import Item from "../items/Item";
import { ShopContext } from "../../context/ShopContest";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

const RelatedProducts = (props) => {
  const { products: all_product } = useContext(ShopContext);

  const related_product = all_product?.filter(
    (product) =>
      product.category?.name?.toLowerCase() === props.category?.toLowerCase(),
  );

  return (
    <div className="relatedproducts">
      <div className="container">
        {/* Decorative Header */}
        <div className="relatedproducts-header flex flex-col items-center mb-12">
          <div className="header-decoration flex items-center">
            <ShoppingBag className="icon-bag" />
            <div className="sparkle-container">
              <Sparkles className="sparkle sparkle-1" />
              <Sparkles className="sparkle sparkle-2" />
              <Sparkles className="sparkle sparkle-3" />
            </div>
          </div>

          <div className="header-content">
            <h2 className="section-title">
              Discover More
              <span className="title-accent"> Treasures</span>
            </h2>
            <p className="section-subtitle">
              Explore our curated collection of {props.category} items
            </p>
          </div>

          <div className="header-ornament">
            <div className="ornament-line"></div>
            <div className="ornament-dot"></div>
            <div className="ornament-line"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relatedproducts-container ">
          <div className="products-showcase grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {related_product?.map((item, index) => (
              <div
                key={item.id}
                className="product-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Item
                  id={item.id}
                  image={item.thumbnail}
                  name={item.name}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  quantity={item.quantity}
                />
                <div className="product-glow"></div>
              </div>
            ))}
          </div>

          {/* View All Button */}
        </div>
        <div className="view-all-container my-10 flex justify-center">
          <button className="bordered-button flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105">
            <span>View All Products</span>
            <ArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
