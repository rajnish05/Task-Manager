import React, { Component } from 'react';
import { addTask } from '../../actions/authAction'
import { AddTask } from '../../common/validation'
import { connect } from 'react-redux';
import Select from "react-select";
import { DefaultOption } from '../../common/DefaultOption'
import Moment from 'moment';
import { parse } from 'path';
// Date in format of "DD-MM-YYYY"
const date = new Date()
const dateTime = Moment(date).format("DD-MM-YYYY");

class CreatTask extends Component {
	constructor() {
		super();
		this.state = {
			task: {
				T_id: "",
				Task: '',
				created_At: "",
				assignTo: ''
			},
			status: "",
			errors: {}
		};
		this.handleChangeFor = this.handleChangeFor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		// Updating T_id for new Task
		if (this.props.Tasks.tasks.length) {
			let index = parseInt(this.props.Tasks.tasks.length) - 1
			var T_id = this.props.Tasks.tasks[index].T_id.split('_')
			var newId = parseInt(T_id[1]) + 1
			if (this.props.Tasks.tasks.length <= 9) {
				T_id = 'T_0' + newId
			} else {
				T_id = 'T_' + newId
			}
		}else{
			T_id = 'T_01' 
		}

		this.setState({ T_id: T_id })

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

	// Task Status 
	StatusChange = (event) => {
		console.log('sssssss', event.value)
		this.setState({ status: event.value });
	}

	// Creating Task 
	handleSubmit(event) {
		event.preventDefault();
		let taskObj = {
			T_id: this.state.T_id,
			Task: this.state.task.Task,
			assignTo: this.state.task.assignTo,
			created_At: dateTime,
			status: this.state.status,
		}
		// Validating task Input
		AddTask(taskObj)
			.then(res => {
				if (res) {
					this.props.addTask(taskObj);
				}
			})
			.catch(err => {
				console.log('err', err)
				this.setState({ errors: err })
			})

	}


	render() {
		const { errors } = this.state
		return (
			<div className="container">
				<div className="col-lg-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="Task">Task Name</label>
							<input
								type="text"
								className="form-control"
								id="Task"
								autoComplete="off"
								onChange={this.handleChangeFor('Task')} value={this.state.task.Task}
							/>
							<span className='text-red'>{errors.Task}</span>
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
							<span className='text-red'>{errors.assignTo}</span>
						</div>
						<div className="form-group">
							<label htmlFor="status">Status</label>
							<Select
								onChange={this.StatusChange}
								options={DefaultOption.Status}
								placeholder="Select Status"
							/>
							<span className='text-red'>{errors.status}</span>
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
	addTask: (data) => dispatch(addTask(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatTask);