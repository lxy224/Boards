import taskActions from '../utility/tasks';
import unilityOperation from './utility'

export const inprocess_to_review = (item) =>{
    return (dispatch)=>{
        dispatch(unilityOperation.isLoading(true));
        taskActions.move(item,"review")
            .then((response)=>response.data)
            .then((item)=> dispatch(inprocess_to_review_success({...item,taskStatus:"review"})))
            .catch((response)=>
                dispatch(unilityOperation.hasError(true))
            )
    }

};

export const inprocess_to_open = (item) =>({
    type:"INPROCESS_TO_OPEN",
    item
});

export const inprocess_to_review_success = (item) =>({
    type:"INPROCESS_TO_REVIEW",
    item
});

export const inprocess_to_done = (item) =>({
    type:"INPROCESS_TO_DONE",
    item
});
