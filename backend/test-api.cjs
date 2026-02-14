const axios = require('axios');

async function testApi() {
    console.log('Fetching products from backend...');
    try {
        const response = await axios.get('http://localhost:5000/api/products?category=womendress');
        console.log('✅ API Response Status:', response.status);
        console.log('✅ Products Count:', response.data.length);
        if (response.data.length > 0) {
            console.log('Sample Product:', response.data[0].productName);
        }
    } catch (err) {
        console.error('❌ API Call Failed:', err.message);
        if (err.response) {
            console.error('Response Data:', err.response.data);
        }
    }
}

testApi();
