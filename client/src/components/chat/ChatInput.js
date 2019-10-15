/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };
  }

  textChangeHandler = (event) => {
    this.setState({ chatInput: event.target.value }, () => {
      document.getElementById('message').addEventListener('keypress', () => {
        this.props.onSend(true);
      });
    });
  }

  submitHandler = (event) => {
    // Stop the form from refreshing the page on submit
    event.preventDefault();
    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
    // Clear the input box
    this.setState({ chatInput: '' });
  }


  render() {
    // Display a user input form and do something when it is submitted
    return (
      <div>
        <form className="form-inline chat-input" onSubmit={this.submitHandler}>
          <input
            id="message"
            type="text"
            className="form-control"
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder="Type a message"
            required
          />
        </form>
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;
