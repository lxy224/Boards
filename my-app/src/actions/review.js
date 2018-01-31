import taskActions from '../utility/tasks';
import unilityOperation from './utility'

export const review_to_done = (item) =>{
    return (dispatch)=>{
        dispatch(unilityOperation.isLoading(true));
        taskActions.move(item,"done")
            .then((response)=>response.data)
            .then((item)=> dispatch(review_to_done_success({...item,taskStatus:"done"})))
            .catch((response)=>
                dispatch(unilityOperation.hasError(true))
            )
    }

};

export const review_to_open = (item) =>({
    type:"REVIEW_TO_OPEN",
    item
});

export const review_to_inprocess = (item) =>({
    type:"REVIEW_TO_INPROCESS",
    item
});

export const review_to_done_success = (item) =>({
    type:"REVIEW_TO_DONE",
    item
});
