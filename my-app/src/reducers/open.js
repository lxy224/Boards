import openAction from '../actions/open'
const initialState = [];
const handleOpenItem  = (state = initialState, action)=>{
    switch (action.type){
        case openAction.open_to_inprocess:
            for(let i=0;i<state.task.openTasks.length;i++){
                if(state.task.openTasks[i].id === action.id){
                    state.task.openTasks[i].taskStatus = "inProcess";
                    return {...state
                    };
                }
            }
            return state;
        default:
            return state
    }
}
export default handleOpenItem