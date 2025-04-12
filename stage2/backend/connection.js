// connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let db;

async function connectToDatabase() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1); // Exit on failure
    }
}

module.exports = {
    connectToDatabase,
    getDb: () => db
};
