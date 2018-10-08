/**
 * Determines if a function does not throw an error.
 * @param {Function} fn Function to test.
 */
const doesNotThrow = (fn) => {
  try {
    fn();
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Determines if a function throws an error.
 * @param {Function} fn Function to test.
 */
const doesThrow = (fn) => !doesNotThrow(fn);

module.exports = {
  doesNotThrow,
  doesThrow
};