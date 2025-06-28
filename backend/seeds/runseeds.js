const mongoose = require("mongoose");

const seedWinter = require("./winter");
const seedSummer = require("./summer");
const seedSofttoy = require("./softtoy");
const seedmendress = require('./mensdress'); 
const seedwomendress = require('./womendress');
const seedbags = require('./bags');
const seedkids = require('./kids');
const seedfootwear = require('./footwear');
const seedaccessories = require('./accessories');

async function runSeeds() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/live_project", {
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

    console.log("🌱 All seeding done!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

runSeeds();
