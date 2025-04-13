# Inventory Management System

A desktop-based Inventory Management System built with **Python**, using **Tkinter** for the GUI and **SQLAlchemy** for database interaction. This tool allows you to manage products, record stock movements (stock-in, sales, manual removals), and maintain an action log.

## Features

- Add new products with category, price, and stock.
- Update stock by stocking in, selling, or manual removal.
- View current product inventory.
- View a log of recent inventory actions.
- Uses SQLite for simple local data storage.

---

## Tech Stack

- **Frontend:** Tkinter (Python GUI Library)
- **Backend:** SQLAlchemy ORM with SQLite
- **Database Models:** Products, Stock Movements, Logs

---

## UI Preview

> Simple and functional interface with forms for product entry and buttons for stock operations.

---

## Project Structure


---

##  How It Works

### Database Models

- **Product**: Stores product info (name, category, price, stock quantity)
- **StockMovement**: Tracks all stock-related operations
- **Logs**: Records action logs with timestamps

### Operations

- **Add Product**: Adds a new product with initial stock
- **Stock In**: Increases stock of a product
- **Sell Product**: Decreases stock if enough quantity exists
- **Manual Removal**: Removes stock manually (e.g., damaged goods)
- **Action Logs**: Logs all stock changes for traceability

---

##  Getting Started

### Prerequisites

- Python 3.8+
- Recommended: Use a virtual environment

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdullahIqbal26904/bazaar_case_study/tree/main/stage1.git
   cd inventory-management-system

2. Install dependencies:
    ```bash
    pip install sqlalchemy

3. Run the application:
    ```bash
    python database.py
    python gui.py

4. A window should appear where you can start adding products and managing inventory.

Data Persistence

The system uses SQLite and stores data locally in inventory.db.
Database tables are auto-created when you run the app for the first time.