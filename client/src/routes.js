import Body from './containers/body';
import Profile from './containers/profile';
import Signup from './containers/userSignup';
import Login from './containers/userLogin';
import ManageUser from './containers/manageuser';
import JobForm from './containers/addJob';
import UpdateJobForm from './containers/updateJob';
import AppliedList from './containers/appliedlist';
import NotFound from './components/NotFound';
import PrivateRoute from './components/generalComponents/privateRoute';

const routes = [
  {
    path: '/',
    exact: true,
    component: Body,
  },
  {
    path: '/profile',
    component: PrivateRoute(Profile),
  },
  {
    path: '/register',
    component: Signup,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/manageusers',
    component: PrivateRoute(ManageUser),
  },
  {
    path: '/addjob',
    component: PrivateRoute(JobForm),
  },
  {
    path: '/updatejob',
    component: PrivateRoute(UpdateJobForm),
  },
  {
    path: '/appliedlist',
    component: PrivateRoute(AppliedList),
  },
  {
    path: '/*',
    component: NotFound,
  },
];

export default routes;
