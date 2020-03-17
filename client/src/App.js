import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer.component';
import ErrorBoundary from './components/generalComponents/error.boundary';
import Header from './redux-containers/header';
import alertActions from './redux/alert/alertActions';
import routes from './routes';
import history from './_helpers/history';
import config from './config';

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
    Axios.get(`${config.nodeBaseUrl}/user`)
    .then(res => {
      console.log(res);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
    })
    .catch(err => {
      console.log(err)
    })
  }

  hideAlert = (e) => {
    e.preventDefault();
    document.getElementById('alert').style.display = 'none';
  };

  render() {
    const { alert } = this.props;
    return (
      <ErrorBoundary>
        <div className="container-fluid mobile-container-fluid">
          <Header />
          <div className="content">
            <div className="">
              <div className="">
                {alert.message && (
                  <div id="alert" className={`alert ${alert.type}`}>
                    {alert.message}
                    <span
                      tabIndex={0}
                      role="button"
                      onClick={this.hideAlert}
                      onKeyPress={this.onKeyPress}
                      className="w3-button w3-large w3-display-topright"
                    >
                      &times;
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Switch>
              {routes.map((route, index) => (
                <Route {...route} key={`route${Math.random()}`} />
              ))}
            </Switch>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default App;
