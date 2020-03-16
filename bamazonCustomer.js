var inquirer = require("inquirer");
var mysql = require("mysql");

// initiate mySQL package with configurations
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// give function of what we want to do when connected
connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems();
});

// function to display all items for sale
function displayItems(){
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        askPrompt();
    });
}

// function that prompts users for desired product
function askPrompt(){
    inquirer.prompt([
        {
        name: "idPrompt",
        type: "input",
        message: "What is the ID of the product you would like to purchase? \n"
        },
        {
        name: "qtyPrompt",
        type: "input",
        message: "How many units of this product would you like to purchase? \n"
        }
    ]).then(function(answer){
        // callback function after user inputs prompts
        var userId = answer.idPrompt;
        var userQty = answer.qtyPrompt;
        connection.query("SELECT * FROM products WHERE ?", {item_id: userId},
        function(err,res){
            if (err) throw err;
            // if there is not enough of the product left
            if (userQty > res[0].stock_quantity){
                console.log("Insufficient quantity!");
            }
            // if there is enough of the product left
            else{
                // update product quantity
                var newQty = res[0].stock_quantity - parseFloat(userQty);
                console.log("New quantity of product: " + newQty);
                // calculate and show total cost
                var totalCost = res[0].price * userQty;
                console.log("Your total is: $" + totalCost + "\n");

                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQty
                    },
                    {
                        item_id: userId
                    }
                ],
                function(err){
                    if (err) throw err;
                });
            }
            connection.end();
        })
    })
}