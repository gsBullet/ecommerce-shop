// src/pages/DashboardPage.jsx
import React from 'react';
import { mockOrders } from '../data/mockData';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const completedOrders = mockOrders.filter(o => o.status === 'delivered').length;
  const cancelledOrders = mockOrders.filter(o => o.status === 'cancelled').length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Orders" value={pendingOrders} icon="🕒" color="yellow" />
        <StatCard title="Successful Orders" value={completedOrders} icon="✅" color="green" />
        <StatCard title="Cancelled Orders" value={cancelledOrders} icon="❌" color="red" />
        <StatCard title="Total Spent" value={`৳${mockOrders.reduce((acc, o) => acc + o.total, 0)}`} icon="💰" color="blue" />
      </div>
    </div>
  );
};

export default Dashboard;