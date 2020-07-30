import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../constants/ActionTypes'
// convert in "DD-MM-YYYY" format
import Moment from 'moment';
let date = new Date()
const dateTime = Moment(date).format("DD-MM-YYYY");

// initialState
const initialState = {
    tasks: [
        { "T_id": "T_01", "Task": "do_Some_thing", "created_At": dateTime, "status": "pending", "assignTo": "Kumar" },
        { "T_id": "T_02", "Task": "do_Some_thing", "created_At": dateTime, "status": "pending", "assignTo": "Kumar" },
        { "T_id": "T_03", "Task": "do_Some_thing", "created_At": dateTime, "status": "pending", "assignTo": "Kumar" },
        { "T_id": "T_04", "Task": "do_Some_thing", "created_At": dateTime, "status": "pending", "assignTo": "Kumar" }
    ],
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TASK:
            return {
                tasks: [...state.tasks, action.payload]
            }

        case DELETE_TASK:
            let tasks = state.tasks.filter(task =>
                task.T_id !== action.payload.T_id
            )
            return {
                ...state,
                tasks: tasks
            }

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }

        case UPDATE_TASK:
            let updatedtask = []
            state.tasks.forEach(task => {
                if (task.T_id === action.payload.T_id) {
                    task = action.payload
                }
                updatedtask.push(task)
            })

            console.log("herlloss>>>>", updatedtask)
            return {
                tasks: updatedtask
            }

        default:
            return state
    }
}

export default taskReducer;