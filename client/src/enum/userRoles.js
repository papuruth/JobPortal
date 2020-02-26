const Enum = require('enum');

const role = new Enum({ '0': 0, '1': 1, '2': 2 }, { freez: true });
module.exports = role;
