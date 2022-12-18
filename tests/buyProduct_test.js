const checkoutPage = require("../pages/checkout");
const orderHistory = require("../pages/orderHistory");

let loginUser = {
   email: '1671132098824@test.com',
   password: 'pwfTuSKfi9jv',

};

let newAdress = {
   firstName1: 'Oleg',
   lastName: 'Ivanenko',
   address1: 'Loft',
   city: 'Lviv',
   postCode: '77777',
}

Feature('buy');

Scenario('buy product', async ({ I, productPage, checkoutPage }) => {
   I.login(loginUser);
   I.see('My Affiliate Account');
   I.openProductPage();
   productPage.selectProductDetails();

   let price = await productPage.getProductPrice();
   let colourPrice = await productPage.getPricePerColor();
   let sizePrice = await productPage.getPricePerSize();

   I.openCheckoutPage();
   checkoutPage.fillFieldsCheckout(newAdress);

   let totalPrice = await checkoutPage.getTotalPrice();
   let shippingRatePrice = await checkoutPage.getFlatShippingRatePrice();
   let quantity = await checkoutPage.getQuantity();

   price = +price.match(/\d+\.\d+/);
   colourPrice = +colourPrice.match(/\d+\.\d+/);
   sizePrice = +sizePrice.match(/\d+\.\d+/);
   totalPrice = +totalPrice.match(/\d+\.\d+/);
   shippingRatePrice = +shippingRatePrice.match(/\d+\.\d+/);
   quantity = +quantity;

   I.assertEqual((price + colourPrice + sizePrice) * quantity + shippingRatePrice, totalPrice, "Prices are not in match");
   checkoutPage.purchaseCompletion();

   I.openOrderHistoryPage();
   let orderID = await orderHistory.getLastOrderID();
   console.log('Last order ID ' + +orderID.match(/\d+/));


}).tag('buy');
