const Helper = require('@codeceptjs/helper');

class Converter extends Helper {

parsePrice(string){
  return parseFloat(string.replaceAll(/[^0-9\.]+/g, ''));
}
}

module.exports = Converter;
