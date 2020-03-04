/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

export default class TypingIndicator extends React.Component {
  render() {
    let typersDisplay = '';
    let countTypers = 0;
    /* for each user writing messages in chatroom */
    for (const key in this.props.isTyping) {
      /* retrieve the name if it isn't the owner of the chatbox */
      if (key !== this.props.owner && this.props.isTyping[key]) {
        typersDisplay += `, ${key}`;
        countTypers++;
      }
    }
    /* formatting text */
    typersDisplay = typersDisplay.substr(1);
    typersDisplay += countTypers > 1 ? ' are ' : ' is ';
    /* if at least one other person writes */
    if (countTypers > 0) {
      return (
        <div className="chatApp__convTyping">
          {typersDisplay} writing
          <span className="chatApp__convTypingDot"></span>
        </div>
      );
    }
    return <div className="chatApp__convTyping"></div>;
  }
}
