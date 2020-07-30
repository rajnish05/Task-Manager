import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTask, deleteTask } from '../../actions/authAction'
import { connect } from 'react-redux';
import history from "../../history"

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.viewTask= this.viewTask.bind(this);
    }

    // View Task Details
    viewTask = (task) => {
        console.log("Task view>>>>> ", task);
        history.push('/task/view', { 'task': task })
    }

    // Delete Task
    deleteTask(task) {
        console.log(`delete task `, task);
        this.props.deleteTask(task);
    }

    render() {
        const { Tasks } = this.props
        return (
            <div className="container">
                <div className="col-lg-12">
                    <Link to={`/task/new`} ><button className="btn btn-success pull-right m-t-n" >New Task</button></Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Task Id</td>
                                <td>TASK </td>
                                <td>Created Date</td>
                                <td>Status</td>
                                <td>Assign To</td>
                                <td>Action </td>
                            </tr>
                        </thead>
                        <tbody>
                            {Tasks.tasks.map((task, index) =>
                                <tr key={index}>
                                    <td>{task.T_id}</td>
                                    <td>{task.Task}</td>
                                    <td>{task.created_At}</td>
                                    <td>{task.status}</td>
                                    <td>{task.assignTo}</td>
                                    <td> 
                                        <i className="fa fa-edit btn btn-info" onClick={() => this.viewTask(task)}> </i> &nbsp; &nbsp;
                                        <i className="fa fa-trash btn btn-danger" onClick={() => this.deleteTask(task)}> </i></td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>)
    }
}


const mapStateToProps = (state) => ({
    Tasks: state.Tasks
})

const mapDispatchToProps = (dispatch) => ({
    getTask: () => dispatch(getTask()),
    deleteTask: (task) => dispatch(deleteTask(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);