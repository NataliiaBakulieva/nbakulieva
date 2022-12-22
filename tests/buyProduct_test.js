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
};

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

   I.assertEqual((price + colourPrice + sizePrice) * quantity + shippingRatePrice, totalPrice, "Prices are not in match");
   checkoutPage.purchaseCompletion();

   I.openOrderHistoryPage();
   console.log('Last order ID ' + await orderHistory.cleanupOrderID());
}).tag('buy');
