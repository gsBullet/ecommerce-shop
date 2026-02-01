// src/data/mockData.js
export const mockUser = {
  id: 1,
  name: "Rahim Uddin",
  email: "rahim@example.com",
  avatar: "https://i.pravatar.cc/150?img=56",
  isVerified: true,
  profileType: "star", // 'general' or 'star'
  memberSince: "2022-05-15"
};

export const mockOrders = [
  { id: 101, date: "2023-10-26", total: 1250, status: "delivered", items: ["Wireless Mouse", "USB-C Hub"] },
  { id: 102, date: "2023-10-28", total: 4500, status: "pending", items: ["Mechanical Keyboard"] },
  { id: 103, date: "2023-10-20", total: 899, status: "cancelled", items: ["Webcam HD"] },
  { id: 104, date: "2023-10-15", total: 3200, status: "delivered", items: ["27-inch Monitor"] },
  { id: 105, date: "2023-10-29", total: 550, status: "pending", items: ["Laptop Stand"] },
];

export const mockProducts = [
  { id: 1, name: "Wireless Mouse", price: 750, image: "https://via.placeholder.com/150x150/0000FF/FFFFFF?text=Mouse" },
  { id: 2, name: "Mechanical Keyboard", price: 4500, image: "https://via.placeholder.com/150x150/FF0000/FFFFFF?text=Keyboard" },
  { id: 3, name: "USB-C Hub", price: 500, image: "https://via.placeholder.com/150x150/00FF00/FFFFFF?text=Hub" },
  { id: 4, name: "Laptop Stand", price: 550, image: "https://via.placeholder.com/150x150/FFFF00/000000?text=Stand" },
];