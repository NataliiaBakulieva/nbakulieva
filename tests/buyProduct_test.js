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

const LinksGetter = require('../helpers/productLinksGetter.js');
let productLinksFromTxt = LinksGetter.getLinksFromTxt();
console.log(productLinksFromTxt);

Feature('buy');

Before(({ I }) => {
   I.login(loginUser);
   I.see('My Affiliate Account');
});

Data(productLinksFromTxt).Scenario('buy product', async ({ I, productPage, checkoutPage, current }) => {
   I.amOnPage(current.link);
   I.click({ css: 'i.linearicons-cart' });
   let result = await tryTo(() => I.seeElement({ xpath: '//p[text()="Your shopping cart is empty!"]' }));
   console.log(result);

   let price = await productPage.getProductPrice();
   console.log('ЦЕНА ЗА ПРОДУКТА - ' + price);

   let colourPrice = await productPage.checkingColorField();
   console.log('ЦЕНА ЗА ЦВЕТ - ' + colourPrice);

   let sizePrice = await productPage.checkingSizeField();
   console.log("ЦЕНА ЗА РАЗМЕР - " + sizePrice);
   productPage.selectProductDetails();

   I.openCheckoutPage();
   checkoutPage.fillFieldsCheckout(newAdress);

   let totalPrice = await checkoutPage.getTotalPrice();
   let shippingRatePrice = await checkoutPage.getFlatShippingRatePrice();
   let quantity = await checkoutPage.getQuantity();

   I.assertEqual((price + colourPrice + sizePrice) * quantity + shippingRatePrice, totalPrice, "Prices are not in match");
   checkoutPage.purchaseCompletion();

   I.openOrderHistoryPage();
   console.log('Last order ID ' + await orderHistory.getLastOrderID());

}).tag('buy');
