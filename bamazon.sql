
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(5) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES  (0010, 'Dapper Dan Pomade', 'Cosmetics', 9.99, 200),
(0011, 'Levis 501s', 'Menswear', 69.99, 20),
(0012, 'Nature Balance Dog Food', 'Pet Care', 13.95, 15),
(0013, 'Purina Cat Food', 'Pet Care', 6.99, 13),
(0014, 'Hair Comb', 'Beauty Products', .99, 12),
(0015, 'Doc Martens Canvas Boots', 'Shoes', 129.99, 9),
(0016, 'Boca Veggie Burgers', 'Grocery', 2.50, 25),
(0017, 'Ore Ida French Fries', 'Grocery', 2.98, 32),
(0018, 'French Roast Coffee', 'Grocery', 8.75, 41),
(0019, 'Harrys Razors', 'Beauty', 9.99, 50)