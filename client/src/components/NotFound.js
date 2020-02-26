import React, { PureComponent } from 'react';

class NotFound extends PureComponent {
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <h1>Oops!</h1>
          <div className="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <a href="/">Homepage</a>
        </div>
      </div>
    );
  }
}

export default NotFound;
