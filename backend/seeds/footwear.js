const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedfootwear() {
  const products = [
    {
      productName: "Nike Air Max",
      description: "Comfortable and stylish Nike sneakers for everyday use.",
      price: 4299,
      image: "/images/nike.png",
      size: "9"
    },
    {
      productName: "Adidas Sneakers",
      description: "High-performance Adidas sneakers for running and casual wear.",
      price: 3499,
      image: "/images/snikker.png",
      size: "8"
    },
    {
      productName: "Loafers",
      description: "Elegant loafers perfect for formal and semi-formal attire.",
      price: 1999,
      image: "/images/loafer.png",
      size: "10"
    },
    {
      productName: "Formal Shoes",
      description: "Classic formal shoes for office and events.",
      price: 2599,
      image: "/images/formalshoes.png",
      size: "9"
    },
    {
      productName: "Running Shoes",
      description: "Durable running shoes with superior grip and comfort.",
      price: 2799,
      image: "/images/running.png",
      size: "8"
    },
    {
      productName: "Leather Sandals",
      description: "Breathable and comfy leather sandals for daily wear.",
      price: 1499,
      image: "/images/leatherrsanddal.png",
      size: "7"
    },
    {
      productName: "Casual Slip-ons",
      description: "Easy-to-wear slip-ons for quick outings and travel.",
      price: 1699,
      image: "/images/casualchappal.png",
      size: "8"
    },
    {
      productName: "High Ankle Boots",
      description: "Stylish high-ankle boots suitable for trekking and winters.",
      price: 3299,
      image: "/images/highankelboot.png",
      size: "10"
    },
    {
      productName: "Canvas Shoes",
      description: "Lightweight canvas shoes ideal for everyday comfort.",
      price: 999,
      image: "/images/canvas.png",
      size: "7"
    },
    {
      productName: "Chappals",
      description: "Traditional chappals made with soft leather.",
      price: 699,
      image: "/images/chappals.png",
      size: "6"
    },
    {
      productName: "Sports Shoes",
      description: "Designed for performance with cushioned sole and grip.",
      price: 3199,
      image: "/images/sportsshoe.png",
      size: "9"
    },
    {
      productName: "Party Wear Heels",
      description: "Glamorous heels for weddings and celebrations.",
      price: 2399,
      image: "/images/partyheels.png",
      size: "6"
    },
    {
      productName: "Beach Flip Flops",
      description: "Light and waterproof flip flops for beach fun.",
      price: 499,
      image: "/images/beachchappals.png",
      size: "7"
    },
    {
      productName: "Trekking Boots",
      description: "Strong trekking boots built for rough terrain.",
      price: 2899,
      image: "/images/treckingboots.png",
      size: "10"
    },
    {
      productName: "Ethnic Mojaris",
      description: "Traditional ethnic mojaris perfect for festive outfits.",
      price: 1199,
      image: "/images/ethnicmojaris.png",
      size: "8"
    }
  ].map(product => ({
    ...product,
    category: "footwear",
    stock: 20
  }));

  try {
    await Product.insertMany(products);
    console.log("Footwear products inserted successfully!");
  } catch (err) {
    console.error("Failed to insert footwear products:", err);
  }
}

module.exports = seedfootwear;
