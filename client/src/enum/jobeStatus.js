const Enum = require('enum');

const status = new Enum({ '0': 'New', '1': 'Closed' }, { freez: true });
module.exports = status;
