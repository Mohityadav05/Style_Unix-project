const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedaccessoris() {
  const accessories = [
    {
      productName: "Leather Wallet",
      description: "Genuine leather wallet with multiple compartments.",
      price: 599,
      image: "/images/purse.png",
      size: "S"
    },
    {
      productName: "Sunglasses",
      description: "Stylish UV-protected sunglasses for all seasons.",
      price: 899,
      image: "/images/sunglasses.png",
      size: "Universal"
    },
    {
      productName: "Wrist Watch",
      description: "Elegant wrist watch with leather strap.",
      price: 2499,
      image: "/images/wristwatch.png",
      size: "Universal"
    },
    {
      productName: "Backpack",
      description: "Spacious and durable backpack for daily use.",
      price: 1499,
      image: "/images/bagpack.png",
      size: "M"
    },
    {
      productName: "Cufflinks",
      description: "Classic cufflinks for formal wear.",
      price: 799,
      image: "/images/cufflinks.png",
      size: "S"
    },
    {
      productName: "Travel Bag",
      description: "Lightweight and spacious travel bag.",
      price: 1999,
      image: "/images/travelbag.png",
      size: "L"
    },
    {
      productName: "Keychain",
      description: "Durable keychain with leather strap.",
      price: 199,
      image: "/images/keychain.png",
      size: "S"
    },
    {
      productName: "Hiking Hat",
      description: "Protective hat suitable for trekking and hiking.",
      price: 449,
      image: "/images/hikinghat.png",
      size: "Universal"
    },
    {
      productName: "Phone Pouch",
      description: "Multi-functional phone pouch with card slots.",
      price: 299,
      image: "/images/phonepouch.png",
      size: "S"
    },
    {
      productName: "Laptop Sleeve",
      description: "Cushioned laptop sleeve with zipper.",
      price: 999,
      image: "/images/laptopsleves.png",
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
