import React from "react";
import { motion } from "framer-motion";

const categoryData = [
  { name: "Organic Fruits", image: "https://5.imimg.com/data5/ANDROID/Default/2022/12/OK/TC/TD/39059598/product-jpeg-500x500.jpg" },
  { name: "Premium Dairy", image: "https://img.freepik.com/free-photo/dairy-products_114579-8756.jpg" },
  { name: "Gourmet Meats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD52eulV0Dye4626f32uLWStKL3TXABj1WfQ&s" },
  { name: "Luxury Chocolates", image: "https://media.istockphoto.com/id/168413702/photo/luxury-milk-and-dark-chocolate-truffles.jpg?s=612x612&w=0&k=20&c=zjUmD4DJcb2W5NqXKVhtRO_V1i3gW_Tlp1TY-Nu2YmA=" },
  { name: "More", image: "https://t4.ftcdn.net/jpg/09/89/14/33/360_F_989143347_05xyCFnt7xzOHXYWuNEWWnzqzNEiclOS.jpg" },
];

const luxuryItems = [
  { name: "Black Truffle Cheese", category: "Dairy", price: "49.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZI6sDOo80nsS-ndaG4YZtaDeVKmxZSSdmQ&s" },
  { name: "Japanese Wagyu A5", category: "Gourmet Meat", price: "199.99", image: "https://images.unsplash.com/photo-1587049633312-7b5a82f573aa" },
  { name: "Organic Honeycomb", category: "Natural Sweeteners", price: "29.99", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb" },
];

const GroceryDelivery = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 rounded-lg flex justify-between items-center">
        <span className="text-yellow-400 font-bold">📍 123 Beverly Hills, CA</span>
        <input
          type="text"
          placeholder="Search luxury groceries"
          className="bg-gray-700 px-4 py-2 rounded-lg text-white focus:outline-none w-1/3"
        />
      </div>
      
      {/* Offer Banner */}
      <div className="relative mt-6 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://st5.depositphotos.com/7341970/65491/v/450/depositphotos_654910600-stock-illustration-happy-woman-doing-grocery-shopping.jpg"
          alt="Luxury Groceries"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-10 left-10 text-white">
          <h2 className="text-lg">🌟 Exclusive Discounts</h2>
          <h1 className="text-2xl font-bold">Luxury Organic Produce</h1>
          <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500">
            Shop Now
          </button>
        </div>
      </div>
      
      {/* Grocery Categories */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Grocery Categories</h2>
        <span className="text-yellow-500 font-bold cursor-pointer">See All</span>
      </div>
      <div className="flex overflow-x-auto mt-4 space-x-4">
        {categoryData.map((item, index) => (
          <div key={index} className="w-32 text-center">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full mx-auto shadow-md" />
            <p className="mt-2 text-gray-700 font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
      
      {/* Featured Items */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Featured Items</h2>
        <span className="text-yellow-500 font-bold cursor-pointer">See All</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {luxuryItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-lg font-bold text-yellow-500">${item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroceryDelivery;
