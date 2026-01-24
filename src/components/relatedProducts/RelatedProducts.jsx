import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContest";
import { Sparkles, ArrowRight } from "lucide-react";
const BASE_URL = "http://localhost:9000/";

const RelatedProducts = (props) => {
  const { products: all_product } = useContext(ShopContext);

  const related_product = all_product?.filter(
    (product) =>
      product.category?.name?.toLowerCase() === props.category?.toLowerCase(),
  );

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">You May Also Like</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Related <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Products</span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked items from our {props.category} collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {related_product?.slice(0, 8).map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden aspect-square bg-gray-100">
                <img
                  src={BASE_URL + item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quick View Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-gray-800">Quick View</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.new_price}
                  </span>
                  {item.old_price && (
                    <span className="text-sm text-gray-400 line-through">
                      ${item.old_price}
                    </span>
                  )}
                </div>

                {item.quantity && (
                  <div className="text-xs text-gray-500">
                    {item.quantity} in stock
                  </div>
                )}
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;