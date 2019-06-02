import React from 'react';
import {Link} from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 footer">
          <div className="">
            <div className="footer-right">© 2019 Copyright:
                <Link to="/"> jobsHijobs.com</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer