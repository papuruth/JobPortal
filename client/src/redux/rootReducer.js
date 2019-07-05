import { combineReducers } from 'redux';
import { alert } from './alert/alertReducer';
import { authentication, registration, Users } from './user/userReducers';
import { jobs } from './body/bodyReducer'
import { addjob, editJob, updateJob, applyJob, getAppliedJobs, removeJob, updateStatus } from './addJob/jobReducer'
import {pagination} from './pagination/paginationReducer'
import {sendMail, profileUpdate} from './profile/profileReducer'
import { saveMessage, getMessage } from './chat/chatReducer';
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
  pagination,
  sendMail,
  profileUpdate,
  saveMessage,
  getMessage,
  Users
});

export default rootReducer;