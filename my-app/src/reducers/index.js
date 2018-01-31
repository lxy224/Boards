import { combineReducers} from "redux";
import tasks from "./task_sorted";
import user from './user'
import {itemHasErrored,itemIsLoading,displayModal} from './utility'
// import visibilityFilter from "./visibilityFilter";
// import taskTypes from "./task_types"
const taskApp = combineReducers({
    tasks,
    user,
    itemIsLoading,
    itemHasErrored,
    displayModal,

});

export default taskApp