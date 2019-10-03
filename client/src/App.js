import React from 'react';
import { Header } from './containers/header'
import Footer from './components/footer.component'
import { Route, Switch } from 'react-router-dom'
import { alertActions } from './redux/alert/alertActions';
import { history } from './_helpers/history';
import routes from './routes';
class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  hideAlert = (e) => {
    e.preventDefault();
    document.getElementById('alert').style.display = 'none'
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container-fluid">
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
            <Switch>
                {
                  routes.map((route, index) => (
                    <Route key={index} {...route}/>
                  ))
                }
            </Switch>
          </div>
          <Footer />
      </div>
    );
  }
}

export default App;