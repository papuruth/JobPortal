import React from 'react';
import Feedback from './components/feedback.component';
import NotFound from './components/NotFound';
import JobForm from './redux-containers/addJob';
import AppliedList from './redux-containers/appliedlist';
import Body from './redux-containers/body';
import ChatContainer from './redux-containers/chat.container';
import ManageUser from './redux-containers/manageuser';
import Profile from './redux-containers/profile';
import UpdateJobForm from './redux-containers/updateJob';
import Login from './redux-containers/userLogin';
import Signup from './redux-containers/userSignup';
import PublicRoute from './redux-containers/publicRoute';
import PrivateRoute from './redux-containers/privateRoute';

const routes = [
  <PublicRoute key="BodyComponent" restricted={false} path="/" component={Body} exact />,
  <PrivateRoute key="ChatComponent" path="/chat" component={ChatContainer} exact />,
  <PrivateRoute key="ProfileComponent" path="/profile" component={Profile} exact />,
  <PrivateRoute key="ManageUserComponent" restricted path="/manageusers" component={ManageUser} exact />,
  <PrivateRoute key="AddJobComponent" restricted path="/addjob" component={JobForm} exact />,
  <PrivateRoute key="UpdateJobComponent" restricted path="/updatejob" component={UpdateJobForm} exact />,
  <PrivateRoute key="AppliedListComponent" path="/appliedlist" component={AppliedList} exact />,
  <PrivateRoute key="FeedbackComponent" path="/feedback" component={Feedback} exact />,
  <PublicRoute key="SignupComponent" restricted path="/register" component={Signup} exact />,
  <PublicRoute key="LoginComponent" restricted path="/login" component={Login} exact />,
  <PublicRoute key="NotFoundComponent" restricted={false} path="/*" component={NotFound} />
];

export default routes;
