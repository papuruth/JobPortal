/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import moment from 'moment';
import React from 'react';
import MessageItem from './Message';

export default class MessageList extends React.Component {
  render() {
    return (
      <div className="chatApp__convTimeline">
        {this.props.messages
          .slice(0)
          .sort((a, b) => a.id - b.id)
          .reverse()
          .map((messageItem) => (
            <MessageItem
              key={messageItem.id}
              owner={this.props.owner}
              sender={messageItem.sender}
              senderAvatar={messageItem.senderAvatar}
              message={messageItem.message}
              date={moment(new Date(messageItem.date)).format('HH:mm')}
            />
          ))}
      </div>
    );
  }
}
