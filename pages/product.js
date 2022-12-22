const steps_file = require("../steps_file");

const { I } = inject();

module.exports = {

  priceText: { xpath: '//div[@class="price"]/span' },

  sizeField: { xpath: '(//a[@class="sbSelector"])[1]' },
  pricePerSize: { xpath: '//a[@rel="82"]' },

  colourField: { xpath: '(//a[@class="sbSelector"])[2]' },
  pricePerColor: { xpath: '//a[@rel="80"]' },

  addToCartButton: { xpath: '//*[@id="button-cart"]' },

  selectProductDetails() {
    I.click(this.colourField);
    I.click(this.pricePerColor);
    I.click(this.sizeField);
    I.click(this.pricePerSize);
    I.click(this.addToCartButton);
  },

  async getProductPrice() {
    let price = await I.grabTextFrom(this.priceText);
    return I.cleanupPrice(price);
  },
  async getPricePerColor() {
    let price = await I.grabTextFrom(this.pricePerColor);
    return I.cleanupPrice(price);
  },
  async getPricePerSize() {
    let price = await I.grabTextFrom(this.pricePerSize);
    return I.cleanupPrice(price);
  },
}
