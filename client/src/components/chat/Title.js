import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.PureComponent {
  render() {
    return (
      <div className="chatApp__convTitle">
        {this.props.owner}
      </div>
    );
  }
}

Title.propTypes = {
  owner: PropTypes.string.isRequired
};
