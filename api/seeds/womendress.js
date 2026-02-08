const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedwomendress() {
  const womensProducts = [
    {
      productName: "Floral Maxi Dress",
      description: "Elegant floral print maxi dress for casual outings.",
      price: 1499,
      image: "/images/flowerwomen.png",
      size: "M"
    },
    {
      productName: "Denim Jacket",
      description: "Classic denim jacket for a stylish layered look.",
      price: 1199,
      image: "/images/denimwomen.png",
      size: "L"
    },
    {
      productName: "A-Line Kurti",
      description: "Comfortable and trendy A-line kurti for daily wear.",
      price: 999,
      image: "/images/alinnekurti.png",
      size: "M"
    },
    {
      productName: "Palazzo Set",
      description: "Palazzo pants with matching kurti set.",
      price: 899,
      image: "/images/plazoo.png",
      size: "L"
    },
    {
      productName: "Casual Jumpsuit",
      description: "One-piece casual jumpsuit with a relaxed fit.",
      price: 1299,
      image: "/images/jumpsuit.png",
      size: "S"
    },
    {
      productName: "Boho Top",
      description: "Bohemian-style top for a casual chic look.",
      price: 699,
      image: "/images/boho.png",
      size: "M"
    },
    {
      productName: "Cotton Saree",
      description: "Lightweight cotton saree perfect for summer.",
      price: 1399,
      image: "/images/cottonsaree.png",
      size: "Free Size"
    },
    {
      productName: "Wrap Dress",
      description: "Stylish wrap dress with tie-up design.",
      price: 1399,
      image: "/images/wrapdress.png",
      size: "M"
    },
    {
      productName: "Anarkali Kurti",
      description: "Elegant Anarkali kurti with beautiful flare and print.",
      price: 1599,
      image: "/images/anarkalikurti.png",
      size: "L"
    },
    {
      productName: "Peplum Top",
      description: "Flattering peplum top ideal for both formal and casual outings.",
      price: 849,
      image: "/images/peplumtop.png",
      size: "S"
    },
    {
      productName: "Maxi Dress",
      description: "Flowy maxi dress perfect for evening gatherings.",
      price: 1799,
      image: "/images/maxidress.png",
      size: "M"
    },
    {
      productName: "Straight Cut Kurta",
      description: "Minimalist straight cut kurta ideal for daily wear.",
      price: 999,
      image: "/images/straightkurta.png",
      size: "L"
    }
  ].map(product => ({
    ...product,
    category: "womendress",
    stock: 20
  }));

  try {
    await Product.insertMany(womensProducts);
    console.log("Women's clothing products inserted successfully!");
  } catch (err) {
    console.error("Error inserting women's clothing products:", err);
  }
}

module.exports = seedwomendress;
