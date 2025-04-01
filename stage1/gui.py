import tkinter as tk
from tkinter import messagebox
from database import SessionLocal, Product, StockMovement, Logs
from datetime import datetime

# Initialize database session
session = SessionLocal()

# Create main window
root = tk.Tk()
root.title("Inventory Management System")
root.geometry("600x800")


# Function to refresh product list
def refresh_product_list():
    product_list.delete(0, tk.END)
    products = session.query(Product).all()
    for product in products:
        product_list.insert(tk.END, f"{product.id} - {product.name} ({product.stock_quantity} in stock)")


# Function to refresh logs
def refresh_logs():
    logs_list.delete(0, tk.END)
    logs = session.query(Logs).order_by(Logs.timestamp.desc()).limit(10).all()
    for log in logs:
        logs_list.insert(tk.END,
                         f"{log.action} | Product ID: {log.product_id} | {log.quantity} units at {log.timestamp.strftime('%H:%M:%S')}")


# Function to add logs
def add_log(action, product_id, quantity):
    new_log = Logs(action=action, product_id=product_id, quantity=quantity, timestamp=datetime.now())
    session.add(new_log)
    session.commit()
    refresh_logs()


# Function to add a product
def add_product():
    name = name_entry.get().strip()
    category = category_entry.get().strip()
    price = price_entry.get().strip()
    stock_quantity = stock_entry.get().strip()

    if name and category and price and stock_quantity:
        try:
            new_product = Product(name=name, category=category, price=float(price), stock_quantity=int(stock_quantity))
            session.add(new_product)
            session.commit()
            messagebox.showinfo("Success", "Product added successfully!")
            refresh_product_list()
            name_entry.delete(0, tk.END)
            category_entry.delete(0, tk.END)
            price_entry.delete(0, tk.END)
            stock_entry.delete(0, tk.END)
        except ValueError:
            messagebox.showerror("Error", "Invalid price or stock quantity!")
    else:
        messagebox.showerror("Error", "All fields are required!")


# Function to stock in a product
def stock_in():
    try:
        product_id = int(product_id_entry.get().strip())
        quantity = int(quantity_entry.get().strip())

        product = session.query(Product).filter_by(id=product_id).first()
        if product:
            product.stock_quantity += quantity
            movement = StockMovement(product_id=product.id, movement_type="stock-in", quantity=quantity)
            session.add(movement)
            session.commit()
            add_log("Stock In", product_id, quantity)
            messagebox.showinfo("Success", "Stock updated successfully!")
            refresh_product_list()
        else:
            messagebox.showerror("Error", "Product not found!")
    except ValueError:
        messagebox.showerror("Error", "Invalid input!")


# Function to sell a product
def sell_product():
    try:
        product_id = int(product_id_entry.get().strip())
        quantity = int(quantity_entry.get().strip())

        product = session.query(Product).filter_by(id=product_id).first()
        if product and product.stock_quantity >= quantity:
            product.stock_quantity -= quantity
            movement = StockMovement(product_id=product.id, movement_type="sold", quantity=quantity)
            session.add(movement)
            session.commit()
            add_log("Sold", product_id, quantity)
            messagebox.showinfo("Success", "Sale recorded successfully!")
            refresh_product_list()
        else:
            messagebox.showerror("Error", "Not enough stock or product not found!")
    except ValueError:
        messagebox.showerror("Error", "Invalid input!")


# Function to remove stock manually
def remove_stock():
    try:
        product_id = int(product_id_entry.get().strip())
        quantity = int(quantity_entry.get().strip())

        product = session.query(Product).filter_by(id=product_id).first()
        if product and product.stock_quantity >= quantity:
            product.stock_quantity -= quantity
            movement = StockMovement(product_id=product.id, movement_type="manual-removal", quantity=quantity)
            session.add(movement)
            session.commit()
            add_log("Manual Removal", product_id, quantity)
            messagebox.showinfo("Success", "Stock removed successfully!")
            refresh_product_list()
        else:
            messagebox.showerror("Error", "Not enough stock or product not found!")
    except ValueError:
        messagebox.showerror("Error", "Invalid input!")


# UI Layout
frame = tk.Frame(root, padx=10, pady=10)
frame.pack()

# Add product section
tk.Label(frame, text="Add New Product").grid(row=0, column=0, columnspan=2)

tk.Label(frame, text="Name:").grid(row=1, column=0)
name_entry = tk.Entry(frame)
name_entry.grid(row=1, column=1)

tk.Label(frame, text="Category:").grid(row=2, column=0)
category_entry = tk.Entry(frame)
category_entry.grid(row=2, column=1)

tk.Label(frame, text="Price:").grid(row=3, column=0)
price_entry = tk.Entry(frame)
price_entry.grid(row=3, column=1)

tk.Label(frame, text="Stock Quantity:").grid(row=4, column=0)
stock_entry = tk.Entry(frame)
stock_entry.grid(row=4, column=1)

tk.Button(frame, text="➕Add Product", command=add_product).grid(row=5, column=0, columnspan=2, pady=5)

# Product stock operations
tk.Label(frame, text="Manage Stock").grid(row=6, column=0, columnspan=2)

tk.Label(frame, text="Product ID:").grid(row=7, column=0)
product_id_entry = tk.Entry(frame)
product_id_entry.grid(row=7, column=1)

tk.Label(frame, text="Quantity:").grid(row=8, column=0)
quantity_entry = tk.Entry(frame)
quantity_entry.grid(row=8, column=1)

tk.Button(frame, text="📥Stock In", command=stock_in).grid(row=9, column=0, pady=5)
tk.Button(frame, text="🛒Sell", command=sell_product).grid(row=9, column=1, pady=5)
tk.Button(frame, text="❌Manual Removal", command=remove_stock).grid(row=10, column=0, columnspan=2, pady=5)

# Product list
tk.Label(frame, text="📋 Product List").grid(row=11, column=0, columnspan=2)
product_list = tk.Listbox(frame, width=50, height=6)
product_list.grid(row=12, column=0, columnspan=2)
refresh_product_list()

# Logs
tk.Label(frame, text="Action Logs").grid(row=13, column=0, columnspan=2)
logs_list = tk.Listbox(frame, width=50, height=6)
logs_list.grid(row=14, column=0, columnspan=2)
refresh_logs()

# Run application
root.mainloop()
