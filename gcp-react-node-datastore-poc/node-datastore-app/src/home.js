import React, { Component } from "react";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggled: true
        };
    }

    render() {
        return (
            <nav class="navbar navbar-dark bg-primary">
                <div class="container-fluid navbar-text">
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <span class="navbar-brand mb-0 h1">Task Sheet</span>
                    </div>
                </div>
            </nav>
        )
    }

}

export default Home;