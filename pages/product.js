const steps_file = require("../steps_file");

const { I } = inject();

module.exports = {

  priceText: { xpath: '//div[@class="price"]/span' },
  sizeField: { xpath: '(//a[@class="sbSelector"])[2]' },
  pricePerSize: { xpath: '((//ul[@class="sbOptions"])[2]//li)[2]' },
  colourField: { xpath: '(//a[@class="sbSelector"])[1]' },
  pricePerColor: { xpath: '(//ul[@class="sbOptions"]//li)[2]' },
  addToCartButton: { xpath: '//*[@id="button-cart"]' },

  async getProductPrice() {
    let price = await I.grabTextFrom(this.priceText);
    return await I.parsePrice(price);
  },

  async selectProductDetails() {
    await I.click(this.addToCartButton);
  },

  async checkingColorField() {
    let result = await tryTo(() => I.seeElement({ xpath: '//label[text()="Color"]' }));
    let colourPrice;
    if (result) {
      I.click(this.colourField);
      I.click(this.pricePerColor);
      return colourPrice = await this.getPricePerColor();
    }
    else { return 0 };
  },

  async checkingSizeField() {
    let result1 = await tryTo(() => I.seeElement({ xpath: '//label[text()="Size"]' }));
    let sizePrice;
    if (result1) {
      I.click(this.sizeField);
      I.click(this.pricePerSize);
      return sizePrice = await this.getPricePerSize();
    }
    else { return 0 };
  },

  async getPricePerColor() {
    let price = await I.grabTextFrom(this.colourField);
    return await I.parsePrice(price);
  },

  async getPricePerSize() {
    let price = await I.grabTextFrom(this.pricePerSize);
    return await I.parsePrice(price);
  },

}
