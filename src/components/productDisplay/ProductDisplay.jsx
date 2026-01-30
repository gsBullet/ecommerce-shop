import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContest";
import SweetAlert from "../common/SweetAlert";
import { Star, ShoppingCart, Heart, Check, Truck, Shield } from "lucide-react";

const BASE_URL = "http://localhost:9000/";

const ProductDisplay = (props) => {
  const { addToCart, getTotalItems } = useContext(ShopContext);
  const { product } = props;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercentage = Math.round(
    ((product?.old_price - product?.new_price) / product?.old_price) * 100,
  );

  const handleAddToCart = (productId) => {
    if (getTotalItems() >= product?.quantity) {
      SweetAlert({
        title: "Out of Stock",
        icon: "warning",
      });
    } else {
      addToCart(productId, selectedSize);
      setIsAdded(true);
      SweetAlert({
        title: "Product Added Successfully",
        icon: "success",
      });
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl group">
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{discountPercentage}% OFF
                </div>
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"}`}
                />
              </button>
              {product?.thumbnail && (
                <img
                  src={
                    selectedImage
                      ? BASE_URL + selectedImage
                      : BASE_URL + product.thumbnail
                  }
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            {/* Thumbnails */}
            {product?.related_images?.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.related_images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === image
                        ? "border-indigo-500 scale-105 shadow-lg"
                        : "border-gray-200 hover:border-gray-400 hover:scale-105"
                    }`}
                  >
                    <img
                      src={BASE_URL + image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="space-y-8">
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product?.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">(4.0)</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 font-medium">{product?.quantity} sold</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-gray-900">
                ${product?.new_price}
              </span>
              {product?.old_price &&
                product.old_price !== product.new_price && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.old_price}
                  </span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product?.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Select Size
              </h3>
              <div className="flex gap-3">
                {["S", "M", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-xl font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105 shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock & Shipping Info */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">{product?.quantity} units in stock</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5" />
                <span className="font-medium">Free shipping</span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(product.id)}
              className={`w-full py-4 font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  ADDED TO CART
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  ADD TO CART
                </>
              )}
            </button>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                <p className="text-sm font-medium text-gray-900">Quality Product</p>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-900">Category:</span>{" "}
                Women, T-shirt, Crop Top
              </p>
              <p>
                <span className="font-semibold text-gray-900">Tags:</span>{" "}
                Modern, Latest
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;