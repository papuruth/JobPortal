const mongoose = require("mongoose");

const PagesSchema = mongoose.Schema;

const pageData = new PagesSchema({
  company: {
    type: String,
    required: true,
  },
  profileType: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  annualSalary: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

exports.Pages = mongoose.model("pages", pageData);
