import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
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