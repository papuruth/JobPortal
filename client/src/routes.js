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
import PublicRoute from './redux-containers/publicRoute';
import PrivateRoute from './redux-containers/privateRoute';

const routes = [
  <PublicRoute key="BodyComponent" restricted={false} path="/" component={Body} exact />,
  <PrivateRoute key="ChatComponent" notAdmin path="/chat" component={ChatContainer} exact />,
  <PrivateRoute key="ProfileComponent" all path="/profile" component={Profile} exact />,
  <PrivateRoute key="ManageUserComponent" role={0} path="/manageusers" component={ManageUser} exact />,
  <PrivateRoute key="AddJobComponent" restricted path="/addjob" component={JobForm} exact />,
  <PrivateRoute key="UpdateJobComponent" role={1} path="/updatejob" component={UpdateJobForm} exact />,
  <PrivateRoute key="AppliedListComponent" notAdmin path="/appliedlist" component={AppliedList} exact />,
  <PrivateRoute key="FeedbackComponent" role={2} path="/feedback" component={Feedback} exact />,
  <PublicRoute key="NotFoundComponent" restricted={false} path="/*" component={NotFound} />
];

export default routes;
