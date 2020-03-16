DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) default 0,
	stock_quantity INTEGER default 0,
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Kindle', 'Electronics', 99.99, 200),
('Bluetooth Wireless Headphones', 'Electronics', 19.49, 143),
('EXPO Dry Erase Markers', 'Office Products', 14.00, 56);