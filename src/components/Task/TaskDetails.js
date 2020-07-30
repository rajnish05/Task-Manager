import React, { Component } from 'react';
import { updateTask } from '../../actions/authAction'
import { connect } from 'react-redux';
import history from '../../history'
import { DefaultOption } from '../../common/DefaultOption'
import { AddTask } from '../../common/validation'
import Select from "react-select";
var status = ''

class taskDetails extends Component {

	constructor(props) {
		super(props);
		const location = history.location
		this.state = location.state;
		this.handleChangeFor = this.handleChangeFor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// Task details  
	handleChangeFor = (propertyName) => (event) => {
		const { task } = this.state;
		const taskDetails = {
			...task,
			[propertyName]: event.target.value
		};
		this.setState({ task: taskDetails });
	}

	// Updating Task details
	handleSubmit(event) {
		this.setState({ errors: '' })
		event.preventDefault();
		let taskObj = {
			T_id: this.state.task.T_id,
			Task: this.state.task.Task,
			assignTo: this.state.task.assignTo,
			created_At: this.state.task.created_At,
			status: status,
		}
		// Validating task input
		AddTask(taskObj)
			.then(res => {
				console.log('res>>>>>>', res)
				if (res) {
					this.props.updateTask(taskObj);
				}
			})
			.catch(err => {
				console.log('errrrrrr>>>>>>', err)
				this.setState({ errors: err })
			})

	}

	// Status Change
	StatusChange = (event) => {
		status = event.value
	}

	render() {
		const { errors } = this.state
		return (
			<div className="container">
				<div className="col-lg-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group m-t-n">
							<span className='text-red '>'Employee Id' can't be change * </span><br />
							<label htmlFor="T_id">Task Id</label>
							<input
								type="text"
								className="form-control"
								id="T_id"
								autoComplete="off"
								disabled
								onChange={this.handleChangeFor('T_id')} value={this.state.task.T_id}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="Task">Task Name</label>
							<input
								type="text"
								className="form-control"
								id="Task"
								autoComplete="off"
								onChange={this.handleChangeFor('Task')} value={this.state.task.Task}
							/>
							{errors ? <span className='text-red'>{errors.Task}</span> : null}

						</div>
						<div className="form-group">
							<label htmlFor="assignTo">Assign To</label>
							<input
								type="text"
								className="form-control"
								id="assignTo"
								autoComplete="off"
								onChange={this.handleChangeFor('assignTo')} value={this.state.task.assignTo}
							/>
							{errors ? <span className='text-red'>{errors.assignTo}</span> : null}
						</div>
						<div className="form-group">
							<label htmlFor="status">Status</label>
							<Select
								onChange={this.StatusChange}
								options={DefaultOption.Status}
							placeholder="Select Status"
							/>
							{errors ? <span className='text-red'>{errors.status}</span> : null}
						</div>
						<button type="submit" className="btn btn-success btn-lg">
							SAVE
			            </button>
					</form>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	Tasks: state.Tasks
})

const mapDispatchToProps = (dispatch) => ({
	updateTask: (data) => dispatch(updateTask(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(taskDetails);