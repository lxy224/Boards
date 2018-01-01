import { dispatch } from "../index"
import api from "./api"
let loader = {};

// Load
loader.loadAll = () => {
    loader.loadApp();
};

loader.loadApp = () => {
     new Promise(function (resolve,reject) {
         resolve(api.fetchTask());
     }).then(value=>{
            dispatch(
                {
                    type:"GET_ALL_TASKS",
                    value

                }
            )
            console.log(value)
    })

}

export default loader