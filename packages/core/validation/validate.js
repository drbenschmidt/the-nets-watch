const stringValidators = require('./string/validators');

class Validate {
  constructor() {
    /**
     * String based validators.
     */
    this.string = stringValidators;
  }
};

module.exports = new Validate();