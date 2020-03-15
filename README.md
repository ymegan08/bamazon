# bamazon

Amazon-like storefront with mySQL that takes in orders from customers and deplete stock from the store's inventory.

1) Displays all of the items available for sale
2) Prompts the users with two messages:
  a) Ask them the ID of the product they would like to buy
  b) Ask how many units of the product they would like to buy
3) Once the customer has placed the order, app checks if the store has enough of the product to meet the customer's request
4) If the store does have enough of the product, app fulfill the customer's order
  a) SQL database will update to reflect the remaining quantity
5) Once the update goes through, shows the customer the total cost of their purchase
