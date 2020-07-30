import { combineReducers } from 'redux'
import Tasks from "./taskReducer";
// root reducer
const rootReducer = combineReducers({
    Tasks : Tasks
})

export default rootReducer