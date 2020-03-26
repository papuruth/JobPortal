import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'react-router-dom';
import Footer from './components/footer.component';
import ErrorBoundary from './components/generalComponents/error.boundary';
import Header from './redux-containers/header';
import alertActions from './redux/alert/alertActions';
import routes from './routes';
import history from './_helpers/history';
import userActions from './redux/user/userActions';
import DemoAppWarning from './components/generalComponents/demoAppWarning';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: { type: null, message: null },
      openWarningDialog: false
    };
    const { dispatch } = this.props;
    dispatch(userActions.authUser());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.alert !== state.alert) {
      return {
        alert: props.alert
      };
    }
    return {
      alert: { type: null, message: null }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
    console.log('in app')
    this.setState({
      openWarningDialog: true
    });
  }

  hideAlert = (e) => {
    e.preventDefault();
    document.getElementById('alert').style.display = 'none';
  };

  render() {
    const { alert } = this.props;
    const { openWarningDialog } = this.state;
    console.log(openWarningDialog)
    return (
      <ErrorBoundary>
        <div className="container-fluid mobile-container-fluid">
          <Header />
          <div className="content">
            {openWarningDialog && <DemoAppWarning />}
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
            <Switch>{routes.map((route, index) => route)}</Switch>
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
