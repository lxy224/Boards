// import taskSorted from "../actions/taskSorted"
// import {open_to_review,open_to_done} from '../actions/open'
// const filterByType = name => tasksArr => {
//     return tasksArr.taskStatus.indexOf(name) > -1
// };
//
// const sortTasks = (tasks) =>{
//     let newState={};
//     newState.open=tasks.filter(filterByType('open'));
//     newState.inProcess=tasks.filter(filterByType('inProcess'));
//     newState.review=tasks.filter(filterByType('review'));
//     newState.done=tasks.filter(filterByType('done'));
//     console.log(newState)
//     return newState;
// }
const sortTasks = (tasks)=>{
    tasks.map((task,i)=>{
        task.sortedId = i
    });
    return tasks;
};

const taskSort = (state=[], action)=>{
    let newState = Object.assign({},state);
    switch (action.type) {
        case "GET_ALL_TASKS":
            let new_state=sortTasks(action.value);
            return new_state;
        case "OPEN_TO_INPROCESS":
            return state.map(task =>
                (task.id === action.item.id)?
                    {...task,taskStatus: "inProcess"}
                    : task
            );

            // return state.map(task =>
            //     (task.id === action.item.id)?
            //         {...task,taskStatus: "inProcess"}
            //         : task
            // );
        case "OPEN_TO_REVIEW":
            newState=state.inProcess;
            return newState;
        case "OPEN_TO_DONE":
            newState=state.review;
            return newState;
        case "INPROCESS_TO_REVIEW":
            return state.map(task =>
                (task.id === action.item.id)?
                    {...task,taskStatus: "review"}
                    : task
            );
        case "INPROCESS_TO_OPEN":
            newState=state.inProcess;
            return newState;
        case "INPROCESS_TO_DONE":
            newState=state.review;
            return newState;

        case "REVIEW_TO_DONE":
            return state.map(task =>
                (task.id === action.item.id)?
                    {...task,taskStatus: "done"}
                    : task
            );
        case "REVIEW_TO_INPROCESS":
            newState=state.inProcess;
            return newState;
        case "REVIEW_TO_OPEN":
            newState=state.review;
            return newState;
        case "MOVE_OPENITEM":
            let hoverItem={},dragItem={};
            for(let i=0;i<state.length;i++){
                if(state[i].sortedId ===action.hoverItem|| state[i].sortedId === action.dragItem){
                    if(state[i].sortedId === action.hoverItem){
                        state[i].sortedId = action.dragItem;
                        hoverItem = state[i];
                        for(let j=i+1;j<state.length;j++){
                            if(state[j].sortedId ===action.dragItem){
                                state[j].sortedId = action.hoverItem
                                dragItem  = state[j];
                            }
                        }
                        break
                    }
                    else{
                        state[i].sortedId = action.hoverItem;
                        dragItem = state[i];
                        for(let j=i+1;j<state.length;j++){
                            if(state[j].sortedId ===action.hoverItem){
                                state[j].sortedId = action.dragItem
                                hoverItem  = state[j];
                            }
                        }
                        break
                    }
                }
            }
            return state

        default:
            return state;
    }
};



export default taskSort
