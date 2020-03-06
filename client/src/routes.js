import Feedback from './components/feedback.component';
import PrivateRoute from './components/generalComponents/privateRoute';
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

const routes = [
  {
    path: '/',
    exact: true,
    component: Body
  },
  {
    path: '/chat',
    component: PrivateRoute(ChatContainer)
  },
  {
    path: '/profile',
    component: PrivateRoute(Profile)
  },
  {
    path: '/register',
    component: Signup
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/manageusers',
    component: PrivateRoute(ManageUser)
  },
  {
    path: '/addjob',
    component: PrivateRoute(JobForm)
  },
  {
    path: '/updatejob',
    component: PrivateRoute(UpdateJobForm)
  },
  {
    path: '/appliedlist',
    component: PrivateRoute(AppliedList)
  },
  {
    path: '/feedback',
    component: PrivateRoute(Feedback)
  },
  {
    path: '/*',
    component: NotFound
  }
];

export default routes;
