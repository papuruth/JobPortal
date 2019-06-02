const Users = require('../models/user')
const job = require('../models/jobs')
const page = require('../models/page')
const apply = require('../models/appliedJobs')
const mailsDetails = require('../models/mailsDetails')
const status = require('../enum/jobeStatus')
const { appliedStatusComp, appliedStatusUser } = require('../enum/appliedStatus')

exports.validateJobs = async (req, res) => {
  try {
    const { designation, company } = req.body
    const jobs = await job.AddJobs.findOne({ $and: [{ 'designation': designation }, { 'company': company }] })
    if (jobs !== null) {
      console.log(jobs)
      res.json('false')
    } else {
      res.json('true')
    }
  }
  catch (error) {
    console.log(error.message)
    res.json(error.message)
  }
}
exports.postJobs = async function (req, res) {
  try {
    const { designation, company } = req.body
    const checkDuplicateJobs = await job.AddJobs.findOne({ $and: [{ 'designation': designation }, { 'company': company }] })
    const checkDuplicatePage = await page.Pages.findOne({ $and: [{ 'designation': designation }, { 'company': company }] })

    if (checkDuplicateJobs !== null && checkDuplicatePage !== null) {
      console.log('Job already exists. Please add new jobs')
      throw new Error('Job already exists. Please add new jobs')
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
        status: status[0].value
      }
    )

    const pageData = new page.Pages(
      {
        company: req.body.company,
        profileType: req.body.profile,
        designation: req.body.designation,
        annualSalary: req.body.salary,
        imageURL: req.body.imageURL,
        city: req.body.city,
        venue: req.body.company,
        status: status[0].value
      }
    )

    await pageData.save()
      .then(() => {
        console.log('Page updated successfully!!')
      })
      .catch((err) => {
        console.log(err.message)
      })

    await data.save()
      .then(() => {
        console.log('Job posted successfully!!')
        res.json({
          title: 'Successful',
          detail: 'Job posted Successfully'
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  } catch (error) {
    console.log(error.message)
    res.json({
      title: 'Error',
      detail: error.message
    })
  }
}

exports.getJobs = function (req, res, next) {
  const page = req.query.page;
  const last = req.query.last
  console.log(page, last)

  if (page === last) {
    job.AddJobs.find({}, function (err, data) {
      if (err) return next(err)
      res.json(data)
    })
      .sort({updatedAt: -1})
      .skip(5 * (page - 1))
  } else {
    job.AddJobs.find({}, function (err, data) {
      if (err) return next(err)
      res.json(data)
    })
      .sort({updatedAt: -1})
      .limit(5)
      .skip(5 * (page - 1))
  }
}

exports.getPageData = function (req, res, next) {
  page.Pages.find({}, (err, data) => {
    return res.json(data)
  })
}

exports.getOneJobs = async function (req, res) {
  await job.AddJobs.findById(req.params.id)
    .then((resp) => {
      res.json(resp)
      return res;
    })
    .catch((error) => {
      console.log(error.message)
    })
}

exports.updateJobs = function (req, res, next) {
  console.log(req.body)
  job.AddJobs.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, data) {
    if (err) return next(err)
    res.send('Data updated successfully')
  })
}

exports.deleteJobs = function (req, res, next) {
  page.Pages.findByIdAndRemove(req.params.id)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err.message)
    })

  job.AddJobs.findByIdAndRemove(req.params.id)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

exports.applyJobs = async function (req, res) {
  try {
    const { id, name } = req.body
    const checkUser = await Users.findOne({ 'name': name })
    const checkJobs = await job.AddJobs.findOne({ '_id': id })
    const checkDuplicateApply = await apply.AppliedJobs.findOne({
      $and: [{ 'userDetails.name': checkUser.name }, { 'jobDetails.designation': checkJobs.designation },
      { 'jobDetails.company': checkJobs.company }]
    })
    if (checkDuplicateApply !== null) {
      throw new Error('You have already applied. Please wait, for result!')
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
      throw new Error('Early bird catches the worm :)')
    }

    const applyData = new apply.AppliedJobs({
      userDetails: {
        // 'location': {
        //   type: 'Point',
        //   coordinates: [checkUser.location.coordinates[0], checkUser.location.coordinates[1]]
        // },
        'userId': checkUser._id,
        'image': checkUser.image,
        'name': checkUser.name,
        'gender': req.body.gender,
        'emailId': checkUser.emailId,
        'phone': checkUser.phone,
        'role': checkUser.role
      },
      jobDetails: {
        'company': checkJobs.company,
        'profileType': checkJobs.profileType,
        'designation': checkJobs.designation,
        'annualSalary': checkJobs.annualSalary,
        'city': checkJobs.city,
        'venue': checkJobs.venue,
        'status': checkJobs.status
      },
      statusUser: appliedStatusUser[0].value,
      statusComp: appliedStatusComp[0].value
    })
    await applyData.save()
      .then(() => {
        res.json({
          title: 'Successful',
          detail: 'Job Applied Successfully'
        })
      })
      .catch((err) => {
        throw new Error(err)
      })
  } catch (err) {
    console.log(err.message)
    res.json({
      errors: [
        {
          title: 'Error',
          errorMessage: err.message
        }
      ]
    })
  }
}

// Company can get details of the job applied for his company
// Pass object company: 'company_name'
// Eg. company: "Kellton Tech"
exports.getAppliedJobs = async function (req, res, next) {
  await apply.AppliedJobs.find({}, (err, data) => {
    if (err) {
      // return next(err)
    } else {
      res.json(data)
    }
  })
}

// Company can change their recieved job application status here
// Jobs will be updated based on their status
// Pass job id and  status.

exports.updateJobStatus = async function (req, res, next) {
  const { status, id } = req.body
  const job = await apply.AppliedJobs.findById(id)
  await apply.AppliedJobs.findByIdAndUpdate(id, { $set: { 'statusComp': status, 'statusUser': status } }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.json({
        data: JSON.stringify(job),
        statusResponse: status
      })
    }
  })
}


// Posting Mail Details
exports.mailDetails = async function (req, res) {
  const { jobId, name, company, designation, city, date, status } = req.body.mailDetails
  try {
    const checkDuplicate = await mailsDetails.findOne({ 'jobId': jobId })
    if (checkDuplicate !== null) {
      await mailsDetails.findOneAndUpdate({ 'jobId': jobId }, { $set: { 'status': status } }, (err, data) => {
        if (err) {
          throw new Error(err)
        } else {
          console.log('Mail exists and updated with new status.')
          res.json(data);
          return;
        }
      })
    } else {
      const mailData = new mailsDetails({
        jobId: jobId,
        name: name,
        company: company,
        designation: designation,
        city: city,
        date: date,
        status: status
      })

      await mailData.save()
        .then((data) => {
          console.log('New mail saved')
          res.json(data)
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  } catch (error) {
    console.log(error.message)
  }
}

exports.getMailDetails = async function (req, res) {
  await mailsDetails.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.json(data)
    }
  })
}

exports.updateAppliedJobs = async function (req) {
  const emailId = req.emailId
  await apply.AppliedJobs.findOneAndUpdate({ 'userDetails.emailId': emailId }, { $set: { 'userDetails.image': req.image } }, (err, res) => {
    if (err) {
      console.log(err.message);
    } else {
      return res;
    }
  })
}