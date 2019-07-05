import React from 'react'

class Label extends React.Component {
    render() {
        return (
            <label htmlFor={this.props.htmlFor} className={this.props.className}>{this.props.title}</label>
        )
    }
}

export default Label;
