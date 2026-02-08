const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedsofttoy() {
  const softToys = [
    {
      productName: "Teddy Bear",
      description: "Classic soft teddy bear, perfect cuddle companion.",
      price: 499,
      size: "Medium",
      image: "/images/teddybear.png"
    },
    {
      productName: "Elephant",
      description: "Cute elephant soft toy with floppy ears.",
      price: 599,
      size: "Large",
      image: "/images/elephant.png"
    },
    {
      productName: "Dinosaur Toy",
      description: "Green dinosaur plush with a soft texture.",
      price: 699,
      size: "Large",
      image: "/images/dianasaur.png"
    },
    {
      productName: "Panda Cuddle Toy",
      description: "Adorable panda bear with black and white fur.",
      price: 499,
      size: "Medium",
      image: "/images/panda.png"
    },
    {
      productName: "Rabbit Toy",
      description: "White bunny with pink ears and soft fur.",
      price: 499,
      size: "Medium",
      image: "/images/rabbit.png"
    },
    {
      productName: "Soft Pillow Toy",
      description: "Cushion-style soft toy with fun design.",
      price: 499,
      size: "Large",
      image: "/images/cushion.png"
    },
    {
      productName: "Cartoon Plush",
      description: "Character plush toy inspired by cartoons.",
      price: 549,
      size: "Medium",
      image: "/images/cartoonplus.png"
    },
    {
      productName: "Mini Teddy Keychain",
      description: "Small teddy bear keychain for bags and keys.",
      price: 199,
      size: "Small",
      image: "/images/softkeychain.png"
    }
  ].map(product => ({
    ...product,
    category: "soft-toys",
    stock: 20
  }));

  try {
    await Product.insertMany(softToys);
    console.log("Soft toys inserted successfully!");
  } catch (err) {
    console.error("Failed to insert soft toys:", err);
  } 
}

module.exports = seedsofttoy;
