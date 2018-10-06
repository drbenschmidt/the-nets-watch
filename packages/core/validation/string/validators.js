const networkingValidators = require('./networking');

const stringValidators = {
  /**
   * Determin if a string is a network addres of type.
   * @param {String} type ipv4|ipv6|mac
   * @param {String} input string to check
   */
  isNetworkAddress(type, input) {
    let result = null;

    switch (type.toLowerCase()) {
      case 'ipv4':
        result = networkingValidators.validateIPv4Address(input);
      break;

      case 'ipv6':
        result = networkingValidators.validateIPv6Address(input);
      break;
      
      default:
        throw new Error(`Network address type ${type} not supported.`);
    }

    if (!result) {
      throw new Error(`Network address "${input}" not valid ${type} address.`);
    }
  }
};

module.exports = stringValidators;