import React from 'react'

class Input extends React.Component {
  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        name={this.props.name}
        type={this.props.input_type}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        autoComplete="off"
      />
    )
  }
}

export default Input;
