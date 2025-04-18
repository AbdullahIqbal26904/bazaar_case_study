# Inventory Management System – Stage 2 (Backend)

This is the backend for a scalable Inventory Management System tailored for kiryana (small retail) stores. In **Stage 2**, we introduced authentication, API enhancements, and implemented clean architecture to ensure maintainability, security, and scalability.

---

## Key Features

- **JWT Authentication** for store login and protected routes
- **API Client** for centralized `axios` config (frontend support)
- Store-specific **Product & Stock Management**
- **Stock Movements** tracked in detail (In, Out, Manual)
- **MVC Architecture** for clean and modular codebase
- **Rate Limiter & Caching** to enhance performance
- Secure, token-based access control
- Structured data via **MySQL relational database**

---

## Database Schema

The backend uses MySQL with the following tables:

- `Stores`: Info about each kiryana store
- `Categories`: Product categories
- `Products`: Store products with categories
- `Store_Stock`: Tracks product quantities for each store
- `Stock_Movements`: Logs all stock-in, out, and manual removals
-  `store_id` is used for authentication context

---

##  Authentication (JWT)

- **Login API** returns a JWT token.
- Pass token in `Authorization: Bearer <token>` header for protected routes.
- Middleware ensures only authenticated store owners can access critical endpoints.

---

##  Project Structure


---

##  API Endpoints

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | `/api/auth/login`      | Login store, returns JWT         |
| GET    | `/api/products`        | List all products (protected)    |
| POST   | `/api/products`        | Create new product (protected)   |
| GET    | `/api/storeStocks`     | Get store stock (protected)      |
| POST   | `/api/stockMovements`  | Record stock movement (protected) |

---

##  Security

- Token verification middleware for protected routes
- Bcrypt used for password hashing
- Rate limiting to prevent abuse
- CORS enabled

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth:** JWT, bcrypt
- **Architecture:** MVC
- **Tools:** dotenv, cors, express-rate-limit

---
# Project Structure
/controllers       # Business logic
/models            # Sequelize models
/routes            # Express route handlers
/middleware        # Auth, rate limiter, etc.
/config            # DB connection & env config


## Setup Instructions (Important)

1. **Run the MySQL Setup Script**

   Before starting the server, run the provided `.sql` file to set up the required database schema in your MySQL instance:

   ```bash
   mysql -u your_username -p < schema.sql
##  Getting Started (Local)
Edit the .env file and make sure to update the following:
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
JWT_SECRET=your_jwt_secret
```bash
# Install dependencies
npm install


# Run server
node server.js


