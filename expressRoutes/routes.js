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
router.get('/api/v1/onlineusers', MessageController.getOnlineUsers);
router.get('/api/v1/chats', MessageController.getMessages);
router.get('/api/v1/user', UserController.authUser);
router.post('/api/v1/register', UserController.addUser);
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
  '/api/v1/authenticate',
  passport.authenticate('local'),
  UserController.login
);
router.post('/api/v1/logout', UserController.logout);
router.get('/api/v1/users', UserController.getUsers);
router.get('/api/v1/mails', JobController.getMailDetails);
router.put('/api/v1/updateuser/:id', UserController.updateUser);
router.delete('/api/v1/deleteuser/:id', UserController.deleteUser);
router.post('/api/v1/jobs', JobController.postJobs);
router.get('/api/v1/appliedjobs', JobController.getAppliedJobs);
router.get('/api/v1/jobs', JobController.getJobs);
router.get('/api/v1/:id', JobController.getOneJobs);
router.put('/api/v1/updatejob/:id', JobController.updateJobs);
router.post('/api/v1/deletejob/:id', JobController.deleteJobs);
router.post('/api/v1/apply', JobController.applyJobs);
router.put('/api/v1/updatejobstatus', JobController.updateJobStatus);
router.post('/api/v1/upload', ImageController.upload);
router.post('/api/v1/getjobsvalidate', JobController.validateJobs);
router.post('/api/v1/maildetails', JobController.mailDetails);
router.get('/api/v1/getoneuser/:id', UserController.getOneUser);
router.post('/api/v1/sendmail', MailController.sendMail);
router.post('/api/v1/messages', MessageController.saveMessage);
router.post('/api/v1/online-users', MessageController.updateOnlineUser);

export default router;
