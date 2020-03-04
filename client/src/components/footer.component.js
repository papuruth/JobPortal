import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className="footer">
        <div className="">
          <div className="footer-right">
            © 2019 Copyright:
            <Link to="/"> jobsHijobs.com</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
