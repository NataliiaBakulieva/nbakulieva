const { I } = inject();

module.exports = {
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  registerLink: { xpath: '//a[.="Register"]' },

  openRegistrationPage() {
    I.click(this.myAccountSpoiler);
    I.click(this.registerLink);
  }
}
