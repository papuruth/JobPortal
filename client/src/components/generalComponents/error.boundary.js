import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WarningIcon from '@material-ui/icons/Warning';
import Header from '../../redux-containers/header';
import Footer from '../footer.component';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    // Catch errors in any components below and re-render with error message
    this.setState({
      hasError: true
    });
    // You can also log error messages to an error reporting service here
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <>
          <Header />
          <div className="error-content">
            <h2 className="error_Heading">
              <WarningIcon style={{ fontSize: 40 }} /> Oops! Something went
              wrong.
            </h2>
            <hr />
            <div className="error_content_detail">
              <h1 className="error_oops">Oops</h1>
              <p className="error_details">
                We appologize for any inconvenience, but an unexpected error
                occured while you were browsing our site.
                <br />
                It&apos;s not you it&apos;s us. <b>This is our fault.</b>
                <br />
                Detailed information about this error has automatically been
                recoreded and wee have been notified.
                <br />
                Yes, we do look at every error. We even try to fix some of them.
                <br />
                It&apos;s not strictly necessary, but if you&apos;d like to give
                us additional information about this error, so do at our
                feedback page, <Link to="/feedback">Feedback</Link>
              </p>
            </div>
            <hr />
            <div className="error_fallback">
              <p>
                As a fallback please try going back <br />
                <ArrowBackIcon style={{ fontSize: 40 }} onClick={() => {this.props.history.goBack()}} />
              </p>
            </div>
          </div>
          <Footer />
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default withRouter(ErrorBoundary);
