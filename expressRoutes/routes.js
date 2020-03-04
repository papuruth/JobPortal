const express = require('express');

const router = express.Router();
const jobController = require('../controllers/job.controller');
const userController = require('../controllers/user.controller');
const imageController = require('../controllers/imageUpload');
const mailController = require('../controllers/mailController');
const messageController = require('../controllers/messageController');

router.get('/onlineusers', messageController.getOnlineUsers);
router.get('/chats', messageController.getMessages);
router.post('/register', userController.addUser);
router.post('/authenticate', userController.login);
router.get('/users', userController.getUsers);
router.get('/mails', jobController.getMailDetails);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);
router.post('/jobs', jobController.postJobs);
router.get('/appliedjobs', jobController.getAppliedJobs);
router.get('/jobs', jobController.getJobs);
router.get('/:id', jobController.getOneJobs);
router.put('/updatejob/:id', jobController.updateJobs);
router.post('/deletejob/:id', jobController.deleteJobs);
router.post('/apply', jobController.applyJobs);
router.put('/updatejobstatus', jobController.updateJobStatus);
router.post('/upload', imageController.upload);
router.post('/getjobsvalidate', jobController.validateJobs);
router.post('/maildetails', jobController.mailDetails);
router.get('/getoneuser/:id', userController.getOneUser);
router.post('/sendmail', mailController.sendMail);
router.post('/messages', messageController.saveMessage);
router.post('/online-users', messageController.updateOnlineUser);

module.exports = router;
