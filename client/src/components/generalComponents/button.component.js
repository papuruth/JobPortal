import React from 'react';


const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.action}
      disabled={!props.disabled}>
      {props.title}
    </button>)
}


export default Button;