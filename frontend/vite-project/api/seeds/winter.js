const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedwinter() {
  const winterProducts = [
    {
      productName: "Woolen Jacket",
      description: "Warm and stylish woolen jacket",
      price: 1599,
      image: "/images/woolenjacket.png",
      size: "M"
    },
    {
      productName: "Thermal Set",
      description: "Thermal top and bottom set for winter",
      price: 899,
      image: "/images/warmerset.png",
      size: "M"
    },
    {
      productName: "Puffer Jacket",
      description: "Insulated puffer jacket for extreme cold",
      price: 2299,
      image: "/images/pufferjacket.png",
      size: "L"
    },
    {
      productName: "Winter Gloves",
      description: "Wool gloves to keep hands warm",
      price: 499,
      image: "/images/wintergloves.png",
      size: "Free Size"
    },
    {
      productName: "Woolen Cap",
      description: "Cozy woolen cap for winter",
      price: 299,
      image: "/images/woolencap.png",
      size: "Free Size"
    },
    {
      productName: "Woolen Muffler",
      description: "Soft muffler to wrap around your neck",
      price: 399,
      image: "/images/mufler.png",
      size: "Free Size"
    },
    {
      productName: "Hoodie Sweatshirt",
      description: "Comfortable hoodie for chilly days",
      price: 1099,
      image: "/images/sweatshirt.png",
      size: "L"
    },
    {
      productName: "Woolen Socks",
      description: "Thick socks for winter comfort",
      price: 199,
      image: "/images/wintershocks.png",
      size: "Free Size"
    },
    {
      productName: "Winter Boots",
      description: "Boots to keep your feet warm and dry",
      price: 1799,
      image: "/images/boot.png",
      size: "L"
    },
    {
      productName: "Overcoat",
      description: "Long overcoat with excellent insulation",
      price: 2499,
      image: "/images/overcoat.png",
      size: "XL"
    },
    {
      productName: "Fleece Pullover",
      description: "Soft and cozy fleece pullover",
      price: 1299,
      image: "/images/menwestern.png",
      size: "M"
    },
    {
      productName: "Thermal Leggings",
      description: "Base layer thermal leggings",
      price: 799,
      image: "/images/legging.png",
      size: "S"
    },
    {
      productName: "Wool Cardigan",
      description: "Classic wool cardigan for warmth",
      price: 1399,
      image: "/images/cardigan.png",
      size: "M"
    },
    {
      productName: "Snow Jacket",
      description: "Heavy-duty snow jacket with hood",
      price: 2699,
      image: "/images/snowjacket.png",
      size: "L"
    },
    {
      productName: "Knitted Sweater",
      description: "Hand-knitted wool sweater",
      price: 999,
      image: "/images/knitteddsweater.png",
      size: "S"
    }
  ].map(product => ({
    ...product,
    category: "winter",
    stock: 20
  }));

  try {
    await Product.insertMany(winterProducts);
    console.log("Winter products inserted successfully!");
  } catch (err) {
    console.error("Error inserting winter products:", err);
  }
}

module.exports = seedwinter;
