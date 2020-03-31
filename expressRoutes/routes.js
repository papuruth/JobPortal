import express from 'express';
import passport from '../passport';
import jobController from '../controllers/job.controller';
import userController from '../controllers/user.controller';
import ImageController from '../controllers/imageUpload';
import MailController from '../controllers/mailController';
import messageController from '../controllers/messageController';

const router = express.Router({ strict: true });
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date());
  next();
});
// ===== Routing ====
router.get('/onlineusers', messageController.getOnlineUsers);
router.get('/chats', messageController.getMessages);
router.get('/user', userController.authUser);
router.post('/register', userController.addUser);
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
  userController.login
);
router.post('/logout', userController.logout);
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
router.post('/upload', ImageController.upload);
router.post('/getjobsvalidate', jobController.validateJobs);
router.post('/maildetails', jobController.mailDetails);
router.get('/getoneuser/:id', userController.getOneUser);
router.post('/sendmail', MailController.sendMail);
router.post('/messages', messageController.saveMessage);
router.post('/online-users', messageController.updateOnlineUser);

export default router;
