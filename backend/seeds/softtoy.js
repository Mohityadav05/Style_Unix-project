const mongoose = require('mongoose');
const Product = require('../Models/Product');

async function seedsofttoy() {
  const softToys = [
    {
      productName: "Teddy Bear",
      description: "Classic soft teddy bear, perfect cuddle companion.",
      price: 499,
      size: "Medium",
      image: "/teddybear.png"
    },
    {
      productName: "Elephant",
      description: "Cute elephant soft toy with floppy ears.",
      price: 599,
      size: "Large",
      image: "/elephant.png"
    },
    {
      productName: "Dinosaur Toy",
      description: "Green dinosaur plush with a soft texture.",
      price: 699,
      size: "Large",
      image: "/dianasaur.png"
    },
    {
      productName: "Panda Cuddle Toy",
      description: "Adorable panda bear with black and white fur.",
      price: 499,
      size: "Medium",
      image: "/panda.png"
    },
    {
      productName: "Rabbit Toy",
      description: "White bunny with pink ears and soft fur.",
      price: 499,
      size: "Medium",
      image: "/rabbit.png"
    },
    {
      productName: "Soft Pillow Toy",
      description: "Cushion-style soft toy with fun design.",
      price: 499,
      size: "Large",
      image: "/cushion.png"
    },
    {
      productName: "Cartoon Plush",
      description: "Character plush toy inspired by cartoons.",
      price: 549,
      size: "Medium",
      image: "/cartoonplus.png"
    },
    {
      productName: "Mini Teddy Keychain",
      description: "Small teddy bear keychain for bags and keys.",
      price: 199,
      size: "Small",
      image: "/softkeychain.png"
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
