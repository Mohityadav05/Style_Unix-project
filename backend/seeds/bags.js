const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedbags() {
  const bags = [
    {
      productName: "Canvas Backpack",
      description: "Durable canvas backpack for everyday use and travel.",
      price: 1399,
      image: "/images/canvasbag.png",
      size: "M"
    },
    {
      productName: "Leather Duffel Bag",
      description: "Spacious leather duffel ideal for weekend getaways.",
      price: 2999,
      image: "/images/leatherduffel.png",
      size: "L"
    },
    {
      productName: "Travel Trolley",
      description: "Hard-shell travel trolley with 360° wheels.",
      price: 4499,
      image: "/images/troley.png",
      size: "L"
    },
    {
      productName: "Mini Shoulder Bag",
      description: "Compact shoulder bag perfect for casual outings.",
      price: 799,
      image: "/images/handbag.png",
      size: "S"
    },
    {
      productName: "Messenger Bag",
      description: "Stylish messenger bag for work and college.",
      price: 1199,
      image: "/images/messangerbag.png",
      size: "M"
    },
    {
      productName: "Laptop Bag",
      description: "Protective laptop bag with padded compartments.",
      price: 1599,
      image: "/images/laptopbag.png",
      size: "M"
    },
    {
      productName: "Gym Duffel",
      description: "Lightweight duffel for carrying gym essentials.",
      price: 999,
      image: "/images/gymduffel.png",
      size: "M"
    }
  ].map(product => ({
    ...product,
    category: "bags",
    stock: 20
  }));

  try {
    await Product.insertMany(bags);
    console.log("Bags inserted successfully!");
  } catch (err) {
    console.error("Failed to insert bags:", err);
  }
}

module.exports = seedbags;
