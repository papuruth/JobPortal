import React from 'react';
// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state of the chatInput so that it is not undefined
    this.state = { chatInput: '' };
    // React ES6 does not bind 'this' to event handlers by default
    // this.submitHandler = this.submitHandler.bind(this);
    // this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  textChangeHandler = (event) => {
    this.setState({ chatInput: event.target.value}, () => {
      document.getElementById('message').addEventListener('keypress', (event) => {
        this.props.onSend(true);
      })
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
            required />
        </form>
      </div>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
