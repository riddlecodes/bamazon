var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'Bamazon'
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Enter a whole number.';
	}
}

function purchase() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'What is the ID of the product you would like to buy?',
			validate: validateInput,
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many units of the product would you like to buy?',
			validate: validateInput,
		}
	]).then(function (input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryString = 'SELECT * FROM products WHERE ?';

		connection.query(queryString, { item_id: item }, function (err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('Whoops! Invalid Item ID. Select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Your products are in stock and your order is being placed!');

					var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryString, function (err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping Bamazon :)');

						connection.end();
					})
				} else {
					console.log('Oh, no! We appear to be out of that product at this time :(');
					console.log('Please select less and try again.');

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	queryString = 'SELECT * FROM products';

	connection.query(queryString, function (err, data) {
		if (err) throw err;

		console.log('Inventory: ');

		var stringOut = '';
		for (var i = 0; i < data.length; i++) {
			stringOut = '';
			stringOut += 'Item ID: ' + data[i].item_id + '  //  ';
			stringOut += 'Product Name: ' + data[i].product_name + '  //  ';
			stringOut += 'Department: ' + data[i].department_name + '  //  ';
			stringOut += 'Price: $' + data[i].price + '\n';

			console.log(stringOut);
		}

		purchase();
	})
}

function runBamazon() {
	displayInventory();
}
runBamazon();