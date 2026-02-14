const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function testConnection() {
    console.log('Attempting to connect to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected successfully to MongoDB!');

        // Check products
        const ProductSchema = new mongoose.Schema({
            productName: String,
            category: String,
            price: Number,
            size: String,
            image: String
        });
        const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

        const count = await Product.countDocuments();
        console.log(`Total products: ${count}`);

        if (count > 0) {
            const sample = await Product.findOne();
            console.log('Sample product:', JSON.stringify(sample, null, 2));

            const categories = await Product.distinct('category');
            console.log('Available categories:', categories);
        } else {
            console.log('⚠️ No products found in the database.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

testConnection();
