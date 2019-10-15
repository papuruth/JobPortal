/* eslint-disable no-underscore-dangle */
const Users = require("../models/user");
const roles = require("../enum/userRoles");
const jobController = require("../controllers/job.controller");

exports.addUser = async function addUser(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      res.send("Cannot be empty");
    } else {
      const checkDuplicate = await Users.findOne({ emailId: req.body.email });
      if (checkDuplicate !== null) {
        res.json({ checkDuplicate: true });
        throw new Error("User exists");
      }

      let role;
      if (req.route.path === "/register") {
        role = roles[2].value;
      }

      const data = new Users(
        {
          name: req.body.fullname,
          emailId: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
          role,
          userStatus: 1,
        },
      );

      await data.save()
        .then(() => {
          res.json({ isSignup: true });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.login = async function login(req, res) {
  try {
    const checkUser = await Users
      .findOne({ $and: [{ emailId: req.body.email }, { password: req.body.password }] });

    if (checkUser === null) {
      throw new Error("null");
    }

    if (checkUser.userStatus === 0) {
      throw new Error("ban");
    }
    if (checkUser.emailId === req.body.email && checkUser.password === req.body.password) {
      res.json({ data: checkUser, status: true });
    } else {
      throw new Error("false");
    }
  } catch (error) {
    res.json({
      status: error.message,
      data: req.body,
    });
  }
};

exports.getUsers = function getUsers(req, res, next) {
  Users.find({}, (err, data) => {
    if (err) return next(err);
    res.send(data);
    return true;
  });
};

exports.getOneUser = async function getOneUser(req, res) {
  await Users.findById(req.params.id, (err, data) => {
    if (err) {
      return err;
    }
    res.json(data);
    return true;
  });
};
exports.updateUser = async function updateUser(req, res, next) {
  await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, async (err) => {
    if (err) return next(err);
    // Fetching updated user details
    const user = await Users.findById(req.params.id);
    // User Object
    const userDetails = {
      userId: user._id,
      name: user.name,
      gender: user.gender,
      emailId: user.emailId,
      phone: user.phone,
      role: user.role,
      userStatus: user.userStatus,
      image: user.image,
    };
    if (user.role === 2) {
      // Calling Update Applied Jobs with updated user details
      await jobController.updateAppliedJobs(req, userDetails);
      if (req.body.userStatus === 1) {
        res.json({ status: "unban" });
      } else if (req.body.userStatus === 0) {
        res.json({ status: "ban" });
      } else {
        res.json({ status: "true" });
      }
    } else if (user.role === 1) {
      if (req.body.userStatus === 1) {
        res.json({ status: "unban" });
      } else if (req.body.userStatus === 0) {
        res.json({ status: "ban" });
      } else {
        res.json({ status: "true" });
      }
    } else {
      res.json({ status: true });
    }
    return false;
  });
};

exports.deleteUser = function deleteUser(req, res, next) {
  Users.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ status: true });
    return true;
  });
};
