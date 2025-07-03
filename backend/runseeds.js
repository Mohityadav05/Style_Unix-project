const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log("MONGO_URI is:", process.env.MONGO_URI)
const mongoose = require("mongoose");
const seedWinter = require("./seeds/winter");
const seedSummer = require("./seeds/summer");
const seedSofttoy = require("./seeds/softtoy");
const seedmendress = require('./seeds/mensdress'); 
const seedwomendress = require('./seeds/womendress');
const seedbags = require('./seeds/bags');
const seedkids = require('./seeds/kids');
const seedfootwear = require('./seeds/footwear');
const seedaccessories = require('./seeds/accessories');

async function runSeeds() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await seedWinter();
    await seedSummer();
    await seedSofttoy();
    await seedfootwear();
    await seedwomendress();
    await seedbags();
    await seedmendress();
    await seedkids();
    await seedaccessories();

    console.log("All seeding done!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

runSeeds();
