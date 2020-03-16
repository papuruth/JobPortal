/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const Users = require('../models/user');
const job = require('../models/jobs');
const page = require('../models/page');
const apply = require('../models/appliedJobs');
const MailsDetails = require('../models/mailsDetails');
const status = require('../enum/jobeStatus');
const { appliedStatusComp, appliedStatusUser } = require('../enum/appliedStatus');

exports.validateJobs = async (req, res) => {
  try {
    const { designation, company } = req.body;
    const jobs = await job.AddJobs.findOne({ $and: [{ designation }, { company }] });
    if (jobs !== null) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(error.message);
  }
};
exports.postJobs = async function postJobs(req, res) {
  try {
    const { designation, company } = req.body;
    const checkDuplicateJobs = await job.AddJobs.findOne({ $and: [{ designation }, { company }] });
    const checkDuplicatePage = await page.Pages.findOne({ $and: [{ designation }, { company }] });

    if (checkDuplicateJobs !== null && checkDuplicatePage !== null) {
      throw new Error('Job already exists. Please add new jobs');
    }
    const data = new job.AddJobs(
      {
        company: req.body.company,
        profileType: req.body.profile,
        designation: req.body.designation,
        annualSalary: req.body.salary,
        imageURL: req.body.imageURL,
        city: req.body.city,
        venue: req.body.company,
        status: status[0].value,
      },
    );

    const pageData = new page.Pages(
      {
        company: req.body.company,
        profileType: req.body.profile,
        designation: req.body.designation,
        annualSalary: req.body.salary,
        imageURL: req.body.imageURL,
        city: req.body.city,
        venue: req.body.company,
        status: status[0].value,
      },
    );

    await pageData.save();

    await data.save()
      .then(() => {
        res.json({
          title: 'Successful',
          detail: 'Job posted Successfully',
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    res.json({
      title: 'Error',
      detail: error.message,
    });
  }
};

exports.getJobs = async function getJobs(req, res, next) {
  const { page, role, name } = req.query;
  let totalPages = 0;
  if (role) {
    // Get all jobs on company basis
    const totalJobs = await job.AddJobs.find({ company: name });
    if (totalJobs.length % 4 !== 0) {
      totalPages = Math.floor(totalJobs.length / 4) + 1;
    } else {
      totalPages = totalJobs.length / 4;
    }

    job.AddJobs.find({ company: name }, (err, data) => {
      if (err) return next(err);
      res.json({
        jobs: data,
        pager: {
          currentPage: Number(page),
          pages: totalPages,
          totalItems: totalJobs.length,
        },
      });
      return true;
    })
      .sort({ updatedAt: -1 })
      .limit(4)
      .skip(4 * (Number(page)));
  } else {
    // Get all jobs
    const totalJobs = await job.AddJobs.find({});
    if (totalJobs.length % 4 !== 0) {
      totalPages = Math.floor(totalJobs.length / 4) + 1;
    } else {
      totalPages = totalJobs.length / 4;
    }
    job.AddJobs.find({}, (err, data) => {
      if (err) return next(err);
      res.json({
        jobs: data,
        pager: {
          currentPage: Number(page),
          pages: totalPages,
          totalItems: totalJobs.length,
        },
      });
      return true;
    })
      .sort({ updatedAt: -1 })
      .limit(4)
      .skip(4 * (Number(page)));
  }
};

exports.getOneJobs = async function getOneJobs(req, res) {
  await job.AddJobs.findById(req.params.id)
    .then((resp) => {
      res.json(resp);
      return res;
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.updateJobs = function updateJobs(req, res, next) {
  job.AddJobs.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
    res.send('Data updated successfully');
    return true;
  });
};

exports.deleteJobs = function deleteJobs(req, res) {
  page.Pages.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });

  job.AddJobs.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

exports.applyJobs = async function applyJobs(req, res) {
  try {
    const { id, name } = req.body;
    const checkUser = await Users.findOne({ name });
    const checkJobs = await job.AddJobs.findOne({ _id: id });
    const checkDuplicateApply = await apply.AppliedJobs.findOne({
      $and: [{ 'userDetails.name': checkUser.name }, { 'jobDetails.designation': checkJobs.designation },
        { 'jobDetails.company': checkJobs.company }],
    });
    if (checkDuplicateApply !== null) {
      throw new Error('You have already applied. Please wait, for result!');
    }

    // const lat = checkUser.location.coordinates[0]
    // const lon = checkUser.location.coordinates[1]
    // const filteredJobs5km = await job.AddJobs.find({
    //   'location': {
    //     $near: {
    //       $geometry: {
    //         type: 'Point',
    //         coordinates: [lat, lon]
    //       },
    //       $maxDistance: 5000
    //     }
    //   }
    // })
    //   .then((data) => {
    //     return data
    //   })
    //   .catch((err) => {
    //     throw new Error(err)
    //   })
    // const filteredJobs = filteredJobs5km.filter((item) => {
    //   if (item.designation === designation) {
    //     return true;
    //   }
    //   return false;
    // })
    // if (filteredJobs5km.length === 0) {
    //   throw new Error('You must be within 5km')
    // }

    // if (filteredJobs.length === 0) {
    //   throw new Error('No ' + designation + ' jobs around your area')
    // }

    if (checkJobs.status !== 'New') {
      throw new Error('Early bird catches the worm :)');
    }

    const applyData = new apply.AppliedJobs({
      userDetails: {
        // 'location': {
        //   type: 'Point',
        //   coordinates: [checkUser.location.coordinates[0], checkUser.location.coordinates[1]]
        // },
        userId: checkUser._id,
        image: checkUser.image,
        name: checkUser.name,
        gender: req.body.gender,
        emailId: checkUser.emailId,
        phone: checkUser.phone,
        role: checkUser.role,
      },
      jobDetails: {
        company: checkJobs.company,
        profileType: checkJobs.profileType,
        designation: checkJobs.designation,
        annualSalary: checkJobs.annualSalary,
        city: checkJobs.city,
        venue: checkJobs.venue,
        status: checkJobs.status,
      },
      statusUser: appliedStatusUser[0].value,
      statusComp: appliedStatusComp[0].value,
    });
    await applyData.save()
      .then(() => {
        res.json({
          title: 'Successful',
          detail: 'Job Applied Successfully',
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.json({
      errors: [
        {
          title: 'Error',
          errorMessage: err.message,
        },
      ],
    });
  }
};

// Company can get details of the job applied for his company
// Pass object company: 'company_name'
// Eg. company: "Kellton Tech"
exports.getAppliedJobs = async function getAppliedJobs(req, res) {
  try {
    const appliedJobs = await apply.AppliedJobs.find({});
    res.json(appliedJobs);
  } catch (error) {
    res.json(error.message);
  }
};

// Company can change their recieved job application status here
// Jobs will be updated based on their status
// Pass job id and  status.

exports.updateJobStatus = async function updateJobStatus(req, res, next) {
  const { status, id } = req.body;
  const job = await apply.AppliedJobs.findById(id);
  await apply.AppliedJobs
    .findByIdAndUpdate(id, { $set: { statusComp: status, statusUser: status } }, (err) => {
      if (err) {
        return next(err);
      }
      res.json({
        data: JSON.stringify(job),
        statusResponse: status,
      });
      return true;
    });
};


// Posting Mail Details
exports.mailDetails = async function mailDetails(req, res) {
  const {
    jobId, name, company, designation, city, date, status,
  } = req.body.mailDetails;
  try {
    const checkDuplicate = await MailsDetails.findOne({ jobId });
    if (checkDuplicate !== null) {
      await MailsDetails.findOneAndUpdate({ jobId }, { $set: { status } }, (err, data) => {
        if (err) {
          throw new Error(err);
        } else {
          res.json(data);
        }
      });
    } else {
      const mailData = new MailsDetails({
        jobId,
        name,
        company,
        designation,
        city,
        date,
        status,
      });

      await mailData.save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.getMailDetails = async function getMailDetails(req, res, next) {
  const {name} = req.query;
  await MailsDetails.find({name}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
    return true;
  });
};

exports.updateAppliedJobs = async function updateAppliedJobs(req, data, next) {
  await apply.AppliedJobs.updateMany({ 'userDetails.userId': mongoose.Types.ObjectId(req.params.id) }, { $set: { userDetails: data } }, { multi: true }, (err, res) => {
    if (err) {
      return next(err);
    }
    return res;
  });
};
