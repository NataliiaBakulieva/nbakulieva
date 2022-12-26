const steps_file = require("../steps_file");

const { I } = inject();

module.exports = {

  priceText: { xpath: '//div[@class="price"]/span' },

  sizeField: { xpath: '(//a[text()="--- Please Select ---"])[1]' },
  pricePerSize: { xpath: '//a[@rel="82"]' },

  colourField: { xpath: '(//a[@class="sbSelector"])[2]' },
  pricePerColor: { xpath: '//a[@rel="80"]' },

  addToCartButton: { xpath: '//*[@id="button-cart"]' },

  async getProductPrice() {
    let price = await I.grabTextFrom(this.priceText);
    return await I.parsePrice(price);
  },

  async selectProductDetails() {

    let result1 = await tryTo(() => I.seeElement({ xpath: '//label[text()="Size"]' }));
    let sizePrice;
    if (result1) {
      I.click(this.sizeField);
      I.click(this.pricePerSize);
     /* 
      sizePrice = await this.getPricePerSize();
      console.log('Цена размер ' + sizePrice);
      */
    };

    let result = await tryTo(() => I.seeElement({ xpath: '//label[text()="Color"]'}));
    let colourPrice;
    if (result) {
      I.click(this.colourField);
      I.click(this.pricePerColor);
      /*colourPrice = await this.getPricePerColor();
      console.log('Цена цвет ' + colourPrice);*/
    };

    I.click(this.addToCartButton);
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
