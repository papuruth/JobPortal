const Enum = require('enum');

const appliedStatusUser = new Enum(
  {
    0: 'Applied',
    1: 'In Progress',
    2: 'Shortlisted',
    3: 'Selected',
    4: 'Rejected'
  },
  { freez: true }
);
const appliedStatusComp = new Enum(
  {
    0: 'Pending',
    1: 'In Progress',
    2: 'Shortlisted',
    3: 'Selected',
    4: 'Rejected'
  },
  { freez: true }
);

exports.appliedStatusComp = appliedStatusComp;
exports.appliedStatusUser = appliedStatusUser;
