const { I } = inject();

module.exports = {

  lastOrder: { xpath: '(//tbody//td[@class="text-right"])[1]' },

  async getLastOrderID() {
    return await I.grabTextFrom(this.lastOrder);
  },

  async cleanupOrderID() {
    let orderID = await this.getLastOrderID();
    return +orderID.slice(1);
  },

}