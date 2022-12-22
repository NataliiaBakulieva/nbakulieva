const signInButton = { xpath: '//a[text()="Sign In"]' };
const emailField = { css: '#input-email' };
const passwordField = { css: '#input-password' };
const submitButton = { xpath: '//input[@type="submit"]' };

const STORE_URL = 'http://opencart.qatestlab.net/index.php';
let ProductPageURL = 'http://opencart.qatestlab.net/index.php?route=product/product&product_id=48';
const CHECKOUT_URL = 'http://opencart.qatestlab.net/index.php?route=checkout/checkout';
const ORDER_HISTIRY_URL = 'http://opencart.qatestlab.net/index.php?route=account/order';

module.exports = function () {
  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    },
    openProductPage() {
      this.amOnPage(ProductPageURL);
    },
    openCheckoutPage() {
      this.amOnPage(CHECKOUT_URL);
    },
    openOrderHistoryPage() {
      this.amOnPage(ORDER_HISTIRY_URL);
    },
    login(user) {
      this.openStore();
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      this.click(submitButton);
    },
    cleanupPrice(price) {
      //I did not understand how to correctly derive the price using the method .replaceAll()
      return +(price.match(/\d+\.\d+/));
    },
  });
}
