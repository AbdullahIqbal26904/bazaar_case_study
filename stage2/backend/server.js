// server.js or index.js
const { connectToDatabase } = require('./connection.js');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const storeRoutes = require('./routes/storeRoutes.js');
const storeStockRoutes = require('./routes/storestockRoutes.js'); // Add this line

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/storeStocks', storeStockRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to the Product API');
});

const port = process.env.PORT || 3000;
// server.js or index.js
console.log('Starting server...'); // Add this

connectToDatabase().then(() => {
    console.log('Server is ready to interact with the database');

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err); // Add this
});
