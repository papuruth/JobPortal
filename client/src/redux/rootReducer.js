import { combineReducers } from 'redux';
import alert from './alert/alertReducer';
import {
  authentication,
  registration,
  Users,
  Logout
} from './user/userReducers';
import jobs from './body/bodyReducer';
import {
  addjob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJobs,
  removeJob,
  updateStatus
} from './addJob/jobReducer';
import { sendMail, profileUpdate } from './profile/profileReducer';
import { saveMessage, getMessage, getOnlineUser } from './chat/chatReducer';
import getNotifications from './notifications/notifReducer';
import loaderReducer from './loader/loaderReducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  jobs,
  registration,
  addjob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJobs,
  removeJob,
  updateStatus,
  sendMail,
  profileUpdate,
  saveMessage,
  getMessage,
  Users,
  getNotifications,
  Logout,
  getOnlineUser,
  loaderReducer
});

export default rootReducer;
