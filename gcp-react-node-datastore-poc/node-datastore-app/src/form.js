import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Grid from './grid';
import constants from './constants';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: undefined,
            items: []
        }
    }

    render() {
        return (
            <div class="container">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Task Name" aria-label="Recipient's username" value={this.props.taskName} onChange={this.assignValue} />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.submitTask}>Add Task</button>
                </div>
            </div>
        )
    }

    submitTask = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskName: this.state.taskName
            })
        };
        fetch(constants.baseUrl + '/task', requestOptions)
            .then(data => {
                //console.log('--->', data);
                // calling list API
                fetch(constants.baseUrl + '/task')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            //console.log('--->', result);
                            this.setState({
                                items: result
                            });
                        },
                        (error) => {
                            this.setState({
                                error
                            });
                        }
                    )
            });
    }

    assignValue = (event) => {
        this.setState({ taskName: event.target.value });
    }


}

export default Form;