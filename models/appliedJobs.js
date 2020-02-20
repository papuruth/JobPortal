const mongoose = require('mongoose');

const ApplySchema = mongoose.Schema;

const applyJobs = new ApplySchema(
  {
    userDetails: {
      type: Object,
      required: true,
    },
    jobDetails: {
      type: Object,
      required: true,
    },
    statusUser: {
      type: String,
      required: true,
    },
    statusComp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

exports.AppliedJobs = mongoose.model('appliedjobs', applyJobs, 'appliedjobs');
