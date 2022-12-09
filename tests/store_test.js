let registrationUser = {
   firstName: 'Natali',
   lastName: 22,
   telephone: '+380733333333',
   password: 'pwfTuSKfi9jv',

};

Feature('store');

Scenario('test something',  ({ I , homePage, registerPage}) => {
I.openStore();
homePage.openRegistrationPage();
registerPage.verifyRegisretAccountText();
registrationUser.email = Date.now() + '@test.com';
registerPage.fillRegistrationDetail(registrationUser);
registerPage.verifyAccountCreatedText();
});
