const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedmendress() {
  const menClothing = [
    {
      productName: "Casual T-Shirt",
      description: "Comfortable everyday cotton t-shirt for casual wear.",
      price: 699,
      image: "/images/casualtshirt.png",
      size: "M"
    },
    {
      productName: "Hooded Sweatshirt",
      description: "Warm and trendy hoodie for cool weather comfort.",
      price: 1499,
      image: "/images/hoodie.png",
      size: "L"
    },
    {
      productName: "Cotton Shorts",
      description: "Breathable cotton shorts ideal for summer casuals.",
      price: 599,
      image: "/images/shorts.png",
      size: "M"
    },
    {
      productName: "Denim Jacket",
      description: "Classic blue denim jacket for all-season layering.",
      price: 1799,
      image: "/images/denimjacketmen.png",
      size: "L"
    },
    {
      productName: "Polo T-Shirt",
      description: "Smart polo tee for a sporty and semi-formal look.",
      price: 799,
      image: "/images/polotshirt.png",
      size: "M"
    },
    {
      productName: "Slim Fit Jeans",
      description: "Stylish and stretchable slim fit denim jeans.",
      price: 1299,
      image: "/images/slimfit.png",
      size: "32"
    },
    {
      productName: "Formal Shirt",
      description: "Perfect formal shirt for office and meetings.",
      price: 999,
      image: "/images/menwestern.png",
      size: "L"
    },
    {
      productName: "Cotton Kurta",
      description: "Traditional Indian cotton kurta for festive occasions.",
      price: 1099,
      image: "/images/cottonkurta.png",
      size: "XL"
    },
    {
      productName: "Joggers",
      description: "Relaxed fit joggers ideal for workouts or lounging.",
      price: 899,
      image: "/images/jogger.png",
      size: "M"
    },
    {
      productName: "Denim Jacket",
      description: "Rugged and fashionable denim jacket for men.",
      price: 1599,
      image: "/images/denimjacket.png",
      size: "L"
    }
  ].map(product => ({
    ...product,
    category: "men-clothing",
    stock: 20
  }));

  try {
    await Product.insertMany(menClothing);
    console.log("Men's clothing products inserted successfully!");
  } catch (err) {
    console.error("Error inserting men's clothing:", err);
  }
}

module.exports = seedmendress;
