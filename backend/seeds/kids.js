const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedkids() {
  const kidsProducts = [
    {
      productName: "Floral Frock",
      description: "Beautiful floral frock for girls, perfect for parties and outings.",
      price: 799,
      image: "/images/flowerdress.png",
      size: "M"
    },
    {
      productName: "Denim Dungarees",
      description: "Trendy and comfy denim dungarees for playful kids.",
      price: 999,
      image: "/images/dungaress.png",
      size: "L"
    },
    {
      productName: "Cartoon Hoodie",
      description: "Warm hoodie with cartoon print, ideal for winters.",
      price: 899,
      image: "/images/cartoonhoodie.png",
      size: "XL"
    },
    {
      productName: "Mini Kurta Set",
      description: "Traditional kurta pajama set for festive occasions.",
      price: 1099,
      image: "/images/kidsdress.png",
      size: "S"
    },
    {
      productName: "Princess Gown",
      description: "Elegant princess gown with lace and glitter details.",
      price: 1499,
      image: "/images/kurta.png",
      size: "M"
    }
  ].map(product => ({
    ...product,
    category: "kids",
    stock: 20
  }));

  try {
    await Product.insertMany(kidsProducts);
    console.log("Kids products inserted successfully!");
  } catch (err) {
    console.error("Failed to insert kids products:", err);
  }
}

module.exports = seedkids;
