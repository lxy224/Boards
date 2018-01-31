import { dispatch } from "../index"
import unilityOperation from "../actions/utility"
import taskActions from './tasks'
let loader = {};

// Load
loader.loadAll = () => {
    loader.loadApp();
};

loader.loadApp = () => {
    dispatch(unilityOperation.isLoading(true))
    taskActions.getALlItems()
        .then((response)=>response.data)
        .then((items)=>dispatch(unilityOperation.get_all_items(items)))
        .catch((response)=>
            dispatch(unilityOperation.hasError(true))
        )
    //  new Promise(function (resolve,reject) {
    //      resolve(api.fetchTask());
    //  }).then(value=>{
    //         dispatch(
    //             {
    //                 type:"GET_ALL_TASKS",
    //                 value
    //
    //             }
    //         )
    //         console.log(value)
    // })

}

export default loader