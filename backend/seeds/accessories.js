const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedaccessoris() {
  const accessories = [
    {
      productName: "Leather Wallet",
      description: "Genuine leather wallet with multiple compartments.",
      price: 599,
      image: "/purse.png",
      size: "S"
    },
    {
      productName: "Sunglasses",
      description: "Stylish UV-protected sunglasses for all seasons.",
      price: 899,
      image: "/sunglasses.png",
      size: "Universal"
    },
    {
      productName: "Wrist Watch",
      description: "Elegant wrist watch with leather strap.",
      price: 2499,
      image: "/wristwatch.png",
      size: "Universal"
    },
    {
      productName: "Backpack",
      description: "Spacious and durable backpack for daily use.",
      price: 1499,
      image: "/bagpack.png",
      size: "M"
    },
    {
      productName: "Cufflinks",
      description: "Classic cufflinks for formal wear.",
      price: 799,
      image: "/cufflinks.png",
      size: "S"
    },
    {
      productName: "Travel Bag",
      description: "Lightweight and spacious travel bag.",
      price: 1999,
      image: "/travelbag.png",
      size: "L"
    },
    {
      productName: "Keychain",
      description: "Durable keychain with leather strap.",
      price: 199,
      image: "/keychain.png",
      size: "S"
    },
    {
      productName: "Hiking Hat",
      description: "Protective hat suitable for trekking and hiking.",
      price: 449,
      image: "/hikinghat.png",
      size: "Universal"
    },
    {
      productName: "Phone Pouch",
      description: "Multi-functional phone pouch with card slots.",
      price: 299,
      image: "/phonepouch.png",
      size: "S"
    },
    {
      productName: "Laptop Sleeve",
      description: "Cushioned laptop sleeve with zipper.",
      price: 999,
      image: "/laptopsleves.png",
      size: "M"
    }
  ].map(product => ({
    ...product,
    category: "accessories",
    stock: 20
  }));

  try {
    await Product.insertMany(accessories);
    console.log("Accessories added successfully!");
  } catch (err) {
    console.error("Failed to insert accessories:", err);
  }
}

module.exports = seedaccessoris;
