import React from 'react';
import { Header } from './containers/header'
import Footer from './components/footer.component'
import { Router, Route } from 'react-router-dom'
import { alertActions } from './redux/alert/alertActions';
import { history } from './_helpers/history';
import { Body } from './containers/body'
import { Signup } from './containers/userSignup';
import { Login } from './containers/userLogin';
import { Profile } from './containers/profile'
import { JobForm } from './containers/addJob'
import { UpdateJobForm } from './containers/updateJob'
import { AppliedList } from './containers/appliedlist';
import PrivateRoute from './components/generalComponents/privateRoute';
import { ManageUser } from './containers/manageuser';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  componentDidMount() {
    if (localStorage.getItem('currentUser')) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(currentUser);
      console.log(currentUser.name.split(' ')[0], currentUser.name.split(' ')[1]);
      mkos.WidgetParams({
        "first_name": currentUser.name.split(' ')[0],
        "last_name": currentUser.name.split(' ')[1],
        "email": currentUser.emailId,
        "phone": currentUser.phone
      })
    }
  }

  hideAlert = (e) => {
    e.preventDefault();
    document.getElementById('alert').style.display = 'none'
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container-fluid">
        <Router history={history}>
          <Header />
          <div className="shift1">
            <div className="row">
              <div className="col-sm-12">
                {
                  alert.message && <div id="alert" className={`alert ${alert.type}`}>
                    {alert.message}
                    <span onClick={this.hideAlert}
                      className="w3-button w3-large w3-display-topright">&times;</span>
                  </div>
                }
              </div>
            </div>
            <Route path="/profile" component={PrivateRoute(Profile)} />
            <Route exact path="/" component={Body} />
            <Route path="/register" component={Signup} />
            <Route path="/manageusers" component={PrivateRoute(ManageUser)} />
            <Route path="/login" component={Login} />
            <Route path="/addjob" component={PrivateRoute(JobForm)} />
            <Route path="/updatejob" component={PrivateRoute(UpdateJobForm)} />
            <Route path="/appliedlist" component={PrivateRoute(AppliedList)} />
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;