// src/pages/FavoritesPage.jsx
import React from 'react';
import { mockProducts } from '../data/mockData';

const FavoritesPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Favorite Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-xl font-bold text-blue-600 mt-2">৳{product.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;