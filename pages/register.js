const { I } = inject();

module.exports = {
  registerHeaderText: 'Register Account',
  accountCreatedText: 'Your Account Has Been Created!',

  firstNameField:{css: '#input-firstname'},
  lastNameField: {css: '#input-lastname'},
  eMailField: {css: '#input-email'},
  telephoneField: {css: '#input-telephone'},
  passwordField: {css: '#input-password'},
  passwordConfirmField: {css: '#input-confirm'},
  privacyPolicyRadioButton: {xpath: '//*[@id="content"]/form/div/div/input[1]'},
  continueBatton: {xpath: '//*[@id="content"]/form/div/div/input[2]'},

  verifyRegisretAccountText(){
    I.see(this.registerHeaderText);
  },

  fillRegistrationDetail(user){
    I.fillField(this.firstNameField, user.firstName);
    I.fillField(this.lastNameField, user.lastName);
    I.fillField(this.eMailField, user.email);
    I.fillField(this.telephoneField, user.telephone);
    I.fillField(this.passwordField, user.password);
    I.fillField(this.passwordConfirmField, user.password);
    I.click(this.privacyPolicyRadioButton);
    I.click(this.continueBatton);
  },
  verifyAccountCreatedText(){
    I.see(this.accountCreatedText);
  },
}
