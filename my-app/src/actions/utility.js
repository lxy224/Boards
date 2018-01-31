import taskActions from '../utility/tasks';
import {dispatch} from "../index";
import userActions from "../utility/user";
import api from "../utility/api";
const unilityOperation={};

unilityOperation.isLoading=(bool)=>{
    return{
        type: 'IS_LOADING',
        isLoading: bool
    };
}

unilityOperation.hasError=(bool)=>{
    return{
        type: 'HAS_ERROR',
        hasError: bool
    };
}

unilityOperation.search_items = (items)=>{
    return{
        type:"GET_SEARCH_ITEMS",
        items : items
    }
}
unilityOperation.get_all_items = (items)=>{
    return{
        type:"GET_ALL_ITEMS",
        items : items
    }
}
 unilityOperation.delete_task = (task)=>{
    return (dispatch)=>{
        dispatch(unilityOperation.isLoading(true))
        Promise.resolve()
            .then(
                ()=>(taskActions.deleteTask(task))
            )
            .then(
                ()=>taskActions.getALlItems()
            )
            .then(
                (res)=>{
                    let items = res.data;
                    dispatch(unilityOperation.get_all_items(items))
                }
            )
            .catch(
                (err)=>( dispatch(unilityOperation.hasError(true)))
            )
    }
 }
 unilityOperation.add_new_task = (task)=>{
    return(dispatch)=>{
        dispatch(unilityOperation.isLoading(true))
        Promise.resolve()
            .then(
                ()=>(taskActions.insertNewTask(task))
            )
            .then(
                ()=>taskActions.getALlItems()
            )
            .then(
                (res)=>{
                    let items = res.data
                    dispatch(unilityOperation.get_all_items(items))
                }
            )
            .then(
                ()=>(dispatch(unilityOperation.display_modal(false)))
            )
            .catch(
                (err)=>( dispatch(unilityOperation.hasError(true)))
            )
    }
 }
//      ({
//     type:"ADD_NEW_TASK",
//     item:item
// });

unilityOperation.get_search_items = (serachContent)=>{
  return (dispatch)=>{
      dispatch(unilityOperation.isLoading(true));
      var promise;
      if(serachContent===null||serachContent.trim()===""){
          promise =taskActions.getALlItems()
      }
     else {
          promise= taskActions.getSearchItems(serachContent)
      }
      promise.then((response)=>response.data)
          .then((items)=>dispatch(unilityOperation.search_items(items)))
          .catch((response)=>
              dispatch(unilityOperation.hasError(true))
          )
  }

}
unilityOperation.display_modal = (bool)=>{
    return{
        type:"DISPLAY_MODAL",
        displayModal : bool
    }
}


export default unilityOperation;