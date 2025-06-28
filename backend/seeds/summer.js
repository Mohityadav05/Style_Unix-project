const mongoose = require('mongoose');
const Product = require("../Models/Product");

async function seedsummer() {
  const summerProducts = [
    {
      productName: "Floral Maxi Dress",
      description: "Lightweight floral maxi perfect for sunny days.",
      price: 799,
      image: "/floral.png",
      size: "M"
    },
    {
      productName: "Flip Flops",
      description: "Comfortable flip flops for the beach or casual walks.",
      price: 299,
      image: "/flip.png",
      size: "6"
    },
    {
      productName: "Short Skirt",
      description: "Light short skirt perfect for summer outings.",
      price: 499,
      image: "/shortskirt.png",
      size: "S"
    },
    {
      productName: "Light Cotton Pants",
      description: "Loose-fitting cotton pants for everyday use.",
      price: 799,
      image: "/lightcotton.png",
      size: "L"
    },
    {
      productName: "Tank Top",
      description: "Basic tank top for summer layering.",
      price: 349,
      image: "/tank.png",
      size: "S"
    },
    {
      productName: "Crop Top with High Waist Jeans",
      description: "Stylish crop top paired with high-rise denim.",
      price: 1699,
      image: "/Crop.png",
      size: "M"
    },
    {
      productName: "Wrap Midi Dress",
      description: "Modern wrap midi dress perfect for day outs.",
      price: 1499,
      image: "/Wrap.png",
      size: "L"
    },
    {
      productName: "Floral Skater Dress",
      description: "Chic floral print dress for a breezy, feminine look.",
      price: 1399,
      image: "/floraldresswomen.png",
      size: "M"
    },
    {
      productName: "High Waist Skirt",
      description: "Elegant high-waisted skirt for formal and casual outings.",
      price: 899,
      image: "/highwaist.png",
      size: "S"
    },
    {
      productName: "Off-Shoulder Top",
      description: "Trendy off-shoulder top for party and casual wear.",
      price: 749,
      image: "/offshoulder.png",
      size: "M"
    },
    {
      productName: "Ankle-Length Palazzo",
      description: "Comfortable and stylish palazzo pants for all-day wear.",
      price: 1099,
      image: "/palazzo.png",
      size: "L"
    }
  ].map(product => ({
    ...product,
    category: "summer",
    stock: 20
  }));

  try {
    await Product.insertMany(summerProducts);
    console.log("Summer products inserted successfully!");
  } catch (err) {
    console.error("Error inserting summer products:", err);
  }
}

module.exports = seedsummer;
