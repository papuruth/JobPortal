import Body from './redux-containers/body';
import Profile from './redux-containers/profile';
import Signup from './redux-containers/userSignup';
import Login from './redux-containers/userLogin';
import ManageUser from './redux-containers/manageuser';
import JobForm from './redux-containers/addJob';
import UpdateJobForm from './redux-containers/updateJob';
import AppliedList from './redux-containers/appliedlist';
import NotFound from './components/NotFound';
import PrivateRoute from './components/generalComponents/privateRoute';
import ChatContainer from './redux-containers/chat.container';

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
    path: '/*',
    component: NotFound
  }
];

export default routes;
