import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import alert from './alert/alertReducer';
import {
  authentication,
  registration,
  Users,
  Logout,
  authUser
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
import fetchJobByCompanyReducer from './fetchJobByCompany/fetchJobByCompanyReducer';
import loaderReducer from './loader/loaderReducer';

const rootReducer = combineReducers({
  authentication,
  authUser,
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
  loaderReducer,
  fetchJobByCompanyReducer,
  session: sessionReducer
});

export default rootReducer;
