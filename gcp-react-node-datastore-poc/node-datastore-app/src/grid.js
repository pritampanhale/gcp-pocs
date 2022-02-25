import React, { Component } from "react";
import generalConstant from "./constants";
import TaskDetails from "./taskDetailsComponent";

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedTaskId: null,
            task: undefined
        };
    }

    refreshComponent = (e) => {
        e.preventDefault();
        this.componentDidMount();
    }

    componentDidMount() {
        //console.log('----This is called')
        fetch(generalConstant.baseUrl + "/task")
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log('--->', result);
                    this.setState({
                        isLoaded: true,
                        items: result

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div>
                <div class="container">
                    <button type="button" class="btn btn-outline-primary" onClick={this.refreshComponent}>Refresh</button>
                    <br />
                    <br />
                    <div class="container">
                        <div class="row ">
                            <div class="col-1 border">#</div>
                            <div class="col-4 border">Task Name</div>
                            <div class="col-1 border">View</div>
                        </div>
                        {items.map((item, index) => (
                            <div key={item.ID} class="row">
                                <div class="col-1 border">{index + 1}</div>
                                <div class="col-4 border" >{item.taskName}</div>
                                <div class="col-1 border">
                                    <button type="button" class="btn btn-link" onClick={this.selectTask} value={item.ID}>View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div class="container" id="taskByIdPanel">
                    <TaskDetails task={this.state.task}> {this.state.task} </TaskDetails>
                </div>
            </div>
        )
    }

    selectTask = (e) => {
        console.log('calling select task of grid');
        e.preventDefault();
        fetch(generalConstant.baseUrl + "/task/" + e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    result[0].ID = e.target.value;
                    console.log('--->Task By Id result', result);
                    this.setState({
                        task: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

}

export default Grid;