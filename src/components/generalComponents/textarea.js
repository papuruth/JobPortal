import React from 'react'

class Textarea extends React.Component {
    render() {
        return (
            <textarea
                className={this.props.className}
                rows={this.props.rows}
                id={this.props.id}
                onChange={this.props.onChange}
                name={this.props.name}
                value={this.props.value}
            />
        )
    }
}

export default Textarea;
