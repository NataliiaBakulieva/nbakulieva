const steps_file = require("../steps_file");

const { I } = inject();

module.exports = {

    step2continieButton: { xpath: '//input[@id="button-payment-address"]' },
    useNewAddressButton: { xpath: '//label[@for="shipping_addressnew3"]' },
    firstNameField: { xpath: '(//div[@class="col-sm-10"]//input[@name="firstname"])[2]' },
    lastNameField: { xpath: '//input[@id="input-shipping-lastname"]' },
    address1Field: { xpath: '//input[@id="input-shipping-address-1"]' },
    cityField: { xpath: '//input[@id="input-shipping-city"]' },
    postCodeField: { xpath: '//input[@id="input-shipping-postcode"]' },
    countryField: { xpath: '(//div[@class="sbHolder"])[3]' },
    country: { xpath: '//a[@rel="220"]' },
    regionField: { xpath: '(//div[@class="sbHolder"])[4]' },
    region: { css: 'div a[rel="3481"]' },
    step3continueButton: { css: 'div div[class="pull-right"]' },
    step4continueButton: { css: 'div input[id="button-shipping-method"]' },
    termsConditionsCheckbox: { xpath: '//input[@type="checkbox"]' },
    step5continueButton: { css: 'div input[id="button-payment-method"]' },
    confirmOrderButton: { css: 'div input[id="button-confirm"]' },
    flatShippingRatePrice: { xpath: '(//td[@class="text-right"])[10]' },
    totalPrice: { xpath: '(//td[@class="text-right"])[12]' },
    quantity: { xpath: ('(//td[@class="text-right"])[4]') },

    fillFieldsCheckout(newAdress) {
        I.click(this.step2continieButton);
        I.click(this.useNewAddressButton);
        I.fillField(this.firstNameField, newAdress.firstName1);
        I.fillField(this.lastNameField, newAdress.lastName);
        I.fillField(this.address1Field, newAdress.address1);
        I.fillField(this.cityField, newAdress.city);
        I.fillField(this.postCodeField, newAdress.postCode);
        I.click(this.countryField);
        I.click(this.country);
        I.click(this.regionField);
        I.click(this.region);
        I.click(this.step3continueButton);
        I.click(this.step4continueButton);
        I.click(this.termsConditionsCheckbox);
        I.click(this.step5continueButton);
    },

    async getTotalPrice() {
        let prise = await I.grabTextFrom(this.totalPrice);
        console.log(I.cleanupPrice(price))
        return I.cleanupPrice(price);
    },

    async getFlatShippingRatePrice() {
        let prise = await I.grabTextFrom(this.flatShippingRatePrice);
        I.cleanupPrice(price)
        return I.cleanupPrice(price);
    },

    async getQuantity() {
        let quantity = await I.grabTextFrom(this.quantity);
        return +quantity;
    },

    purchaseCompletion() {
        I.click(this.confirmOrderButton);
        I.see('Your order has been placed!');
    },
}
