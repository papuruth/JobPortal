import express from 'express';
import passport from '../passport';
import JobController from '../controllers/job.controller';
import UserController from '../controllers/user.controller';
import ImageController from '../controllers/imageUpload';
import MailController from '../controllers/mailController';
import MessageController from '../controllers/messageController';

const router = express.Router({ strict: true });
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date());
  next();
});
// ===== Routing ====
router.get('/onlineusers', MessageController.getOnlineUsers);
router.get('/chats', MessageController.getMessages);
router.get('/user', UserController.authUser);
router.post('/register', UserController.addUser);
// ===== Google Auth ====
router.get(
  '/google',
  passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
// ===== Facebook Auth ====
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
// ===== Passport Local Authentication ====
router.post(
  '/authenticate',
  passport.authenticate('local'),
  UserController.login
);
router.post('/logout', UserController.logout);
router.get('/users', UserController.getUsers);
router.get('/mails', JobController.getMailDetails);
router.put('/updateuser/:id', UserController.updateUser);
router.delete('/deleteuser/:id', UserController.deleteUser);
router.post('/jobs', JobController.postJobs);
router.get('/appliedjobs', JobController.getAppliedJobs);
router.get('/jobs', JobController.getJobs);
router.get('/:id', JobController.getOneJobs);
router.put('/updatejob/:id', JobController.updateJobs);
router.post('/deletejob/:id', JobController.deleteJobs);
router.post('/apply', JobController.applyJobs);
router.put('/updatejobstatus', JobController.updateJobStatus);
router.post('/upload', ImageController.upload);
router.post('/getjobsvalidate', JobController.validateJobs);
router.post('/maildetails', JobController.mailDetails);
router.get('/getoneuser/:id', UserController.getOneUser);
router.post('/sendmail', MailController.sendMail);
router.post('/messages', MessageController.saveMessage);
router.post('/online-users', MessageController.updateOnlineUser);

export default router;
