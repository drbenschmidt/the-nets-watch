const { Address4, Address6 } = require('ip-address');

module.exports = class NetworkingValidators {
  static validateIPv4Address(address) {
    const addr = new Address4(address);
    return addr.isValid();
  }

  static validateIPv6Address(address) {
    const addr = new Address6(address);
    return addr.isValid();
  }
}