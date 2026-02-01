// src/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          {/* text-gray-600 এর সাথে dark:text-gray-400 */}
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          {/* text-gray-900 এর সাথে dark:text-white */}
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`text-4xl p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;