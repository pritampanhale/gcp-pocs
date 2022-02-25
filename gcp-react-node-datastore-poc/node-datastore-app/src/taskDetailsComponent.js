import React, { Component } from "react";
import generalConstant from "./constants";


class TaskDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        };
        this.taskToRender = null;
    }

    componentDidMount() {
        //console.log('===> componentDidMount', this.props, this.props.children);
    }

    updateTaskState = (e) => {
        console.log('---state--->', e.target.textContent, this.taskToRender);
        e.preventDefault();
        let requestObject = {
            taskId: this.taskToRender.ID
        };

        if (e.target.textContent == 'In Progress') {
            requestObject.started = true;
        } else if (e.target.textContent == 'Complete') {
            requestObject.completed = true;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestObject)
        };
        fetch(generalConstant.baseUrl + '/task', requestOptions)
            .then(data => {
                fetch(generalConstant.baseUrl + "/task")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log('--->PUT Successful', result);
                        },
                        (error) => {
                            this.setState({
                                error
                            });
                        }
                    )
            });
    }

    render() {
        //let taskToRender = undefined;
        if (this.props != undefined &&
            this.props.task != undefined &&
            this.props.task.length > 0) {
            this.taskToRender = this.props.task[0];
        }
        let taskToRender = this.taskToRender;
        //console.log('str1--->', taskToRender);
        let button = undefined;
        if (taskToRender && taskToRender.started != null && taskToRender.started == '') {
            button = <button type="button" class="btn btn-primary btn-lg" onClick={this.updateTaskState}>In Progress</button>;
        } else if (taskToRender && taskToRender.completed != null && taskToRender.completed == '') {
            button = <button type="button" class="btn btn-success btn-lg" onClick={this.updateTaskState}>Complete</button>;
        }

        return (
            <div>
                {taskToRender != undefined &&
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">{taskToRender.taskName}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Created On   :{taskToRender.created}</p>
                            <p class="card-text">Started On   :{taskToRender.started}</p>
                            <p class="card-text">Completed On :{taskToRender.completed}</p>
                            {button}
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default TaskDetails;