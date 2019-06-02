const Users = require('../models/user')
const roles = require('../enum/userRoles')
const jobController = require('../controllers/job.controller')

exports.addUser = async function (req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      res.send('Cannot be empty')
    } else {
      const checkDuplicate = await Users.findOne({'emailId': req.body.email})
      console.log(checkDuplicate)
      if (checkDuplicate !== null) {
        res.json({'checkDuplicate': true})
        throw new Error('User exists')
      }

      var role
      if (req.route.path === '/register') {
        role = roles[2].value
      }

      let data = new Users(
        {
          name: req.body.fullname,
          emailId: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
          role: role
        }
      )

      await data.save()
        .then(data => {
          console.log(data)
          res.json({'isSignup': true});
        })
        .catch(err => {
          throw new Error(err.message)
        })
    }
  } catch (error) {
    console.log(error.message)
  }
}

exports.login = async function (req, res) {
  console.log(req.body)
  try {
    const checkUser = await Users.findOne({ $and:[{'emailId': req.body.email },{'password': req.body.password}]});
    if (checkUser === null) {
      throw new Error('false')
    }
    console.log(checkUser)
    if (checkUser.emailId === req.body.email && checkUser.password === req.body.password) {
      console.log('Successfully logged in')
      res.json({'data': checkUser, 'isLoggedIn': true});
    } else {
      throw new Error('false');
    }
  } catch (error) {
    console.log(error.message)
    res.json({'isLoggedIn': error.message})
  }
}

exports.getUsers = function (req, res, next) {
  Users.find({},function (err, data) {
    if (err) return next(err)
    res.send(data)
  })
}

exports.getOneUser = async function (req, res){
  await Users.findById(req.params.id, (err, data) => {
    if (err) {
      return err
    } else {
      res.json(data)
    }
  })
}
exports.updateUser = async function (req, res, next) {
  console.log('done')
  await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, async function (err, data) {
    if (err) return next(err)
    await jobController.updateAppliedJobs(req.body)
    res.send('User updated successfully')
  })
}

exports.deleteUser = function (req, res, next) {
  Users.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return next(err)
    res.send('User deleted successfully')
  })
}