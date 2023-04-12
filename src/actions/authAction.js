import { ADD_TASK, GET_TASKS, UPDATE_TASK, DELETE_TASK} from '../constants/ActionTypes';
import axios from "axios";
import history from '../history'

// Task Adding 
export const addTask = (task) => {
    return (dispatch) => {
        dispatch({ type: ADD_TASK, payload: task })
        history.push(`/tasks`)
    }
} 

// GET list of Task 
export const getTask = () => dispatch => {
    return (dispatch) => {
        dispatch({
            type: GET_TASKS
        });
    }
}

// Delete Task using task_id
export const deleteTask = (task) => {
    console.log("deleting task is", task)
    return (dispatch) => {
        dispatch({ type: DELETE_TASK, payload: task })
    }
}

// Update Task using task_id
export const updateTask = (task) => {
    console.log("udpate task ", task);
        return (dispatch) => {
            dispatch({ type: UPDATE_TASK, payload: task })
            history.push(`/tasks`)
        }
}