const { I } = inject();

module.exports = {

  lastOrder: { xpath: '(//tbody//td[@class="text-right"])[1]' },

  async getLastOrderID() {
   let orderID = await I.grabTextFrom(this.lastOrder);
   return +orderID.slice(1);
  },
}